import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { HardHat, LogIn, Send } from "lucide-react";
// import CitizenLogin from './CitizenLogin';
// import PoliceLogin from './PoliceLogin';
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from "lucide-react";
import { login } from "@/lib/firebase/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const searchParamError = searchParams.get("error");
  const searchParamRedirectTo = searchParams.get("redirect_to");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>(
    searchParamError ? "Credenciais inválidas. Por favor, tente novamente." : ""
  );

  const credentialsAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResult = await login(email, password);

      if (loginResult.operationType === "signIn") {
        toast.success("Login efetuado com sucesso.");

        navigate(searchParamRedirectTo ? searchParamRedirectTo : "/admin", {
          replace: true,
        }); // Navigate to the new post page
      }
    } catch (error) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
      console.error("Error logging in:", error);
      toast.error("Credenciais inválidas. Por favor, tente novamente.");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <Card className="w-full max-w-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <HardHat className="h-12 w-12 text-primary" color="#273C4E" />
            </div>
            <CardTitle className="text-2xl text-center text-[#273C4E]">
              Bem-vindo ao Rman
            </CardTitle>
            <CardDescription className="text-center">
              Faça login para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={credentialsAction}>
              <div className="space-y-4">
                {error && (
                  <div className="text-red-600 text-sm">
                    <span>{error}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-police">Email</Label>
                  <Input
                    id="email-police"
                    type="email"
                    placeholder="fulano@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-police">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password-police"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ocultar senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-[#273C4E] hover:bg-[#1c2d3d]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RotatingLines
                      ariaLabel="chat-loading"
                      strokeColor="white"
                    />
                    Fazendo login...
                  </>
                ) : (
                  <>
                    <LogIn />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/signup" className="text-primary hover:underline">
                Esqueci minha senha.
              </Link>
            </p>
          </CardFooter>
        </motion.div>
      </Card>
    </div>
  );
}
