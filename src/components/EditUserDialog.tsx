import { FunctionComponent, useState } from "react";
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

import PhoneInput from "react-phone-number-input";
import pt_BR from "react-phone-number-input/locale/pt-BR";
import UserDocument, { UserRoles } from "@/lib/firebase/schemas/UserDocument";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/lib/firebase/users";

interface AddUserDialogProps {
  children: React.ReactNode;
  user: UserDocument;
}

const EditUserDialog: FunctionComponent<AddUserDialogProps> = ({
  children,
  user,
}) => {
  const [newUser, setNewUser] = useState<UserDocument>(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.phone) {
      toast.error("Preencha todos os campos para continuar.");
      return;
    }

    setIsLoading(true);
    try {
      await updateUser(newUser);
      toast.success("Usuário editado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar usuário. Tente novamente mais tarde.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para editar um usuário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateUser}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            {/*



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
              */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>

              <PhoneInput
                placeholder="(99) 99999-9999"
                value={newUser.phone}
                onChange={(phone) =>
                  setNewUser({ ...newUser, phone: phone as string })
                }
                defaultCountry="BR"
                labels={pt_BR}
                inputComponent={Input}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Permissões
              </Label>
              <Select
                onValueChange={(value) => {
                  setNewUser({ ...newUser, role: value as UserRoles });
                }}
                value={newUser.role}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Permissão do usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRoles.COMPANY}>Empresa</SelectItem>
                  <SelectItem value={UserRoles.PERSON}>Pessoa</SelectItem>
                  <SelectItem
                    value={UserRoles.ADMIN}
                    className="text-destructive"
                  >
                    <b>Admin</b>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#273C4E] hover:bg-[#18232c]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RotatingLines ariaLabel="chat-loading" strokeColor="white" />
                  Editando usuário...
                </>
              ) : (
                <>Enviar</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
