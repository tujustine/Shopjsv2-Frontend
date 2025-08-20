/**
 * Composant client de la page de connexion
 */

"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import FormError from "./FormError";

/**
 * Composant principal de la page de connexion
 * Gère le formulaire de connexion et la redirection après authentification
 */
export default function LoginClient() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [state, formAction] = useActionState(
    async (
      prevState: { success: boolean; error: string | null },
      formData: FormData
    ) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        await login(email, password);
        router.push("/");
        return { success: true, error: null };
      } catch {
        return { success: false, error: "Email ou mot de passe incorrect" };
      }
    },
    { success: false, error: null }
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{" "}
          <Link
            href="/users/signup"
            className="font-medium text-orange-900 hover:text-orange-950"
          >
            créez un nouveau compte
          </Link>
        </p>
      </div>

      {/* Formulaire de connexion */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action={formAction}>
            <FormError error={state.error} />

            <FormInput
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              placeholder="votre@email.com"
            />

            <FormInput
              label="Mot de passe"
              id="password"
              name="password"
              type="password"
              required
              placeholder="Votre mot de passe"
            />

            <FormButton
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
}
