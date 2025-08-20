/**
 * Composant client de la page d'administration
 * Gère l'affichage et la gestion des commandes avec drag & drop
 * Permet aux administrateurs de marquer les commandes comme livrées
 */

"use client";

import { useState, useEffect, useOptimistic, startTransition } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Order } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { HiOutlineMenu } from "react-icons/hi";

/**
 * Composant principal de la page d'administration
 * Gère l'authentification, le chargement des commandes et les interactions
 */
export default function AdminClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Permet d'afficher immédiatement les changements avant la confirmation du serveur
  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(
    orders,
    (state, newOrders: Order[]) => newOrders
  );

  // Rediriger si non admin
  useEffect(() => {
    if (user && !user.admin) {
      router.push("/users/login");
    } else if (isLoading) {
      return;
    } else if (!user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.admin) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token d'authentification manquant");
      }

      // Utiliser directement le backend avec le token
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          process.env.NEXT_PUBLIC_API_URL_FALLBACK
        }/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des commandes");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Erreur lors du chargement des commandes");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const markOrderAsDelivered = async (orderId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL ||
        process.env.NEXT_PUBLIC_API_URL_FALLBACK
      }/orders/mark-delivered/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de la commande");
    }
  };

  const handleMarkAsDelivered = async (orderId: string) => {
    try {
      await markOrderAsDelivered(orderId);
      // Mettre à jour l'état local
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, delivered: true } : order
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour de la commande");
    }
  };

  const handleDragEnd = (result: {
    destination: { index: number } | null;
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const items = Array.from(optimisticOrders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Mettre à jour optimistiquement
    startTransition(() => {
      updateOptimisticOrders(items);
    });
    setOrders(items);
  };

  // Afficher un loader si redirection en cours
  if (!user || !user.admin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner className="min-h-screen" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner
            text="Chargement des commandes..."
            className="py-20"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md mx-auto">
              {error}
            </div>
            <button
              onClick={loadOrders}
              className="mt-4 bg-orange-900 text-white px-4 py-2 rounded-md hover:bg-orange-950 cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Commandes à traiter
          </h1>
        </div>

        {optimisticOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune commande disponible.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Commandes ({optimisticOrders.length})
              </h2>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="orders">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {optimisticOrders.map((order: Order, index: number) => (
                        <Draggable
                          key={order._id}
                          draggableId={order._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className={`p-4 border rounded-lg transition-all ${
                                  snapshot.isDragging
                                    ? "shadow-lg rotate-2 scale-105"
                                    : "border-gray-200 hover:border-gray-300"
                                } ${
                                  order.delivered
                                    ? "bg-green-50 border-green-200"
                                    : "bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                          <span className="text-sm font-medium text-gray-600">
                                            {index + 1}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                          <h3 className="font-medium text-gray-900">
                                            Commande #{order._id.slice(-8)}
                                          </h3>
                                          {order.delivered && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              Livrée
                                            </span>
                                          )}
                                        </div>

                                        <div className="text-sm text-gray-600 space-y-1">
                                          <p>
                                            <strong>Client:</strong>{" "}
                                            {order.owner.username}
                                          </p>
                                          <p>
                                            <strong>Adresse:</strong>{" "}
                                            {order.address}
                                          </p>
                                          <p>
                                            <strong>Prix:</strong>{" "}
                                            {order.price.toFixed(2)} €
                                          </p>
                                          <p>
                                            <strong>Produits:</strong>{" "}
                                            {order.products.length} article(s)
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 ml-4">
                                    {!order.delivered && (
                                      <button
                                        onClick={() =>
                                          handleMarkAsDelivered(order._id)
                                        }
                                        className="bg-green-800 text-white px-3 py-2 rounded-md hover:bg-green-900 text-sm cursor-pointer"
                                      >
                                        Marquer comme livrée
                                      </button>
                                    )}

                                    <div className="text-gray-400">
                                      <HiOutlineMenu className="w-5 h-5" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
