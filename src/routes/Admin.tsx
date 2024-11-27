import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Trash2,
  Edit,
  Plus,
  Check,
  X,
  Phone,
  Building,
} from "lucide-react";

// Mock data for users and reservations
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Corp",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Design Inc",
    phone: "098-765-4321",
  },
];

const mockReservations = [
  {
    id: 1,
    user: "John Doe",
    area: "Machining",
    date: "2023-06-01",
    status: "Pending",
    description: "Need to use the CNC machine for a prototype",
  },
  {
    id: 2,
    user: "Jane Smith",
    area: "Welding",
    date: "2023-06-02",
    status: "Pending",
    description: "Working on a metal sculpture project",
  },
];

const mockCompanies = [
  { id: 1, name: "Tech Corp" },
  { id: 2, name: "Design Inc" },
];

export default function Admin() {
  const [users, setUsers] = useState(mockUsers);
  const [reservations, setReservations] = useState(mockReservations);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10); // Simple random password generation
    setNewUser((prevUser) => ({ ...prevUser, password: randomPassword }));
  };

  const formatPhone = (value: any) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length <= 2) return `(${phone}`;
    if (phone.length <= 6) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: "", email: "", company: "", phone: "", password: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (id: number) => {
    // Implement edit user logic here
    console.log("Edit user:", id);
  };

  const handleReservationAction = (id: number, action: "accept" | "reject") => {
    setReservations(
      reservations.map((res) =>
        res.id === id
          ? { ...res, status: action === "accept" ? "Accepted" : "Rejected" }
          : res
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-[#273C4E]">
        Admin Dashboard
      </h1>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#273C4E]">
            Manage Users
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#273C4E] hover:bg-[#1c2d3d]">
                <Plus className="mr-2" size={18} />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new user.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                      className="col-span-3"
                      required
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
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company
                    </Label>
                    <select
                      id="company"
                      value={newUser.company}
                      onChange={(e) =>
                        setNewUser({ ...newUser, company: e.target.value })
                      }
                      className="col-span-3"
                      required
                    >
                      <option value="">Select a Company</option>
                      {mockCompanies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formatPhone(newUser.phone)}
                      onChange={(e) =>
                        setNewUser({ ...newUser, phone: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        className="mr-2"
                        required
                        readOnly
                      />
                      <Button type="button" onClick={generatePassword}>
                        Generate Password
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create User</Button>
                  <Button
                    type="button"
                    onClick={() => (window.location.href = "/create-company")}
                  >
                    Create Company
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditUser(user.id)}
                    className="mr-2"
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#273C4E]">
          Manage Reservations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle>{reservation.user}</CardTitle>
                <CardDescription>
                  {reservation.area} - {reservation.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{reservation.description}</p>
                <p className="mt-2 font-semibold">
                  Status: {reservation.status}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {reservation.status === "Pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleReservationAction(reservation.id, "accept")
                      }
                    >
                      <Check size={18} className="mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleReservationAction(reservation.id, "reject")
                      }
                    >
                      <X size={18} className="mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
