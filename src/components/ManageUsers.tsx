import { FunctionComponent, HtmlHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { MoreHorizontal, Building2, User, ShieldAlert } from "lucide-react";
import AddUserDialog from "@/components/AddUserDialog";
import UserDocument, { UserRoles } from "@/lib/firebase/schemas/UserDocument";
import { UseQueryResult } from "@tanstack/react-query";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPhoneNumber } from "react-phone-number-input";
import EditUserDialog from "./EditUserDialog";

interface ManageUsersProps extends HtmlHTMLAttributes<HTMLDivElement> {
  users: UseQueryResult<UserDocument[], Error>;
}

function roleToIcon(role: UserRoles) {
  switch (role) {
    case UserRoles.ADMIN:
      return (
        <Tooltip>
          <TooltipTrigger>
            <ShieldAlert className="stroke-amber-700" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Administrador</p>
          </TooltipContent>
        </Tooltip>
      );
    case UserRoles.COMPANY:
      return (
        <Tooltip>
          <TooltipTrigger>
            <Building2 className="stroke-[#273C4E]" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Empresa</p>
          </TooltipContent>
        </Tooltip>
      );
    case UserRoles.PERSON:
    default:
      return (
        <Tooltip>
          <TooltipTrigger>
            <User className="stroke-emerald-700" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Pessoa</p>
          </TooltipContent>
        </Tooltip>
      );
  }
}

const ManageUsers: FunctionComponent<ManageUsersProps> = ({
  className,
  users,
}) => {
  if (users.isPending) {
    return <div>Loading...</div>;
  }

  if (users.isError) {
    return <div>Error loading users</div>;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex sm:flex-row items-center justify-between ">
        <div>
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>Adicione e gerencie usuários</CardDescription>
        </div>
        <AddUserDialog />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{roleToIcon(user.role)}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatPhoneNumber(user.phone)}</TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        <EditUserDialog user={user}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            Editar
                          </Button>
                        </EditUserDialog>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Redefinir Senha
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-destructive"
                          onClick={() => {
                            alert("Deletar usuário");
                          }}
                        >
                          Deletar
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ManageUsers;
