import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateStrongPassword } from "@/lib/generate-password";

import { Check, Copy, Plus } from "lucide-react";
import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import pt_BR from "react-phone-number-input/locale/pt-BR";

interface NewUserInterface {
  companyName: string;
  email: string;
  phone: E164Number | undefined;
  password: string;
}

interface AddUserDialogProps {}

const AddUserDialog: FunctionComponent<AddUserDialogProps> = () => {
  const [newUser, setNewUser] = useState<NewUserInterface>({
    companyName: "",
    email: "",
    phone: undefined,
    password: "",
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ companyName: "", email: "", phone: undefined, password: "" });
  };

  const copyPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  const generateNewPassword = () => {
    const strongPassword = generateStrongPassword();

    setNewUser({
      ...newUser,
      password: strongPassword,
    });
  };

  useEffect(() => {
    generateNewPassword();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#273C4E] hover:bg-[#18232c]">
          <Plus className="mr-2 h-4 w-4" /> Cadastrar Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Empresa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova empresa ao
            sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateUser}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Nome
              </Label>
              <Input
                id="companyName"
                value={newUser.companyName}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    companyName: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              {/* <Input
                id="phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                placeholder="(xx)xxxxx-xxxx"
                pattern="$$\d{2}$$\d{5}-\d{4}"
                className="col-span-3"
              /> */}
              <PhoneInput
                placeholder="(99) 99999-9999"
                value={newUser.phone}
                onChange={(phone) => setNewUser({ ...newUser, phone })}
                defaultCountry="BR"
                labels={pt_BR}
                inputComponent={Input}
                className="col-span-3"

                // labels={{ BR: "Brazil" }}
                // international
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <Input
                    id="password"
                    name="password"
                    type="text"
                    value={newUser.password}
                    // onChange={handleInputChange}
                    readOnly
                    disabled
                    required
                    ref={passwordRef}
                    className="bg-gray-100 text-gray-800 w-max"
                    style={{ cursor: "default" }}
                  />
                  <button
                    type="button"
                    onClick={copyPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {isCopied ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
                <Button
                  type="button"
                  onClick={generateNewPassword}
                  variant="ghost"
                >
                  Gerar
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#273C4E] hover:bg-[#18232c]">
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
