import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from "react-phone-number-input";
import pt_BR from "react-phone-number-input/locale/pt-BR";
import { E164Number } from "libphonenumber-js/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export default function Reserve() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    startTime: "",
    endTime: "",
    area: "",
  });
  const [user, loading] = useAuth();

  const [telephone, setTelephone] = useState<E164Number | undefined>();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/not-authenticated?redirect_to=/reserve", {
      replace: true,
    });
    return <></>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAreaChange = (value: string) => {
    setFormData({ ...formData, area: value });
  };

  const validateTimes = (time: string, field: "startTime" | "endTime") => {
    const { startTime } = formData;
    if (field === "endTime") {
      return (
        new Date(`1970-01-01T${time}`) > new Date(`1970-01-01T${startTime}`)
      );
    }

    return true;
  };

  const isTimeSelectable = (time: string, field: "startTime" | "endTime") =>
    field === "startTime" || validateTimes(time, field);

  const validateForm = () => {
    const { startTime, endTime } = formData;
    return (
      startTime &&
      endTime &&
      new Date(`1970-01-01T${endTime}`) > new Date(`1970-01-01T${startTime}`)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("End time must be after the start time.");
      return;
    }
    console.log("Form submitted:", formData);
    // Backend submission logic here
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-red-100 dark:[#273C4E] dark:[#EA0D44] ">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-xl overflow-hidden mx-4">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-4 text-[#273C4E]">
              Nova reserva
            </CardTitle>
            <CardDescription>Crie uma solicitação de reserva</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do utilizador*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email do utilizador*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label htmlFor="cellphone">Telefone para contato*</Label>
                    <PhoneInput
                      placeholder="(99) 99999-9999"
                      value={telephone}
                      onChange={setTelephone}
                      defaultCountry="BR"
                      labels={pt_BR}
                      inputComponent={Input}

                      // labels={{ BR: "Brazil" }}
                      // international
                    />
                  </div>
                  <div className="w-1/2">
                    <div>
                      <Label htmlFor="area">Ambiente*</Label>
                      <Select onValueChange={handleAreaChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um ambiente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="machining">Usinagem</SelectItem>
                          <SelectItem value="carpentry">Carpentaria</SelectItem>
                          <SelectItem value="welding">Solda</SelectItem>
                          <SelectItem value="painting">Pintura</SelectItem>
                          <SelectItem value="laser-cutting">
                            Corte à laser
                          </SelectItem>
                          <SelectItem value="cnc-router">CNC Router</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">Data da reserva*</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={today}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label htmlFor="startTime">Incio*</Label>
                    <Select
                      onValueChange={(value) =>
                        handleTimeChange("startTime", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            formData.startTime || "Horário de início"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="endTime">Fim*</Label>
                    <Select
                      onValueChange={(value) =>
                        handleTimeChange("endTime", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={formData.endTime || "Horário de fim"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className={
                              !isTimeSelectable(time, "endTime")
                                ? "text-gray-400 pointer-events-none"
                                : ""
                            }
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={`w-full bg-[#EA0D44] hover:bg-[#c70a38] ${
                    !validateForm()
                      ? "opacity-30 contrast-75 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!validateForm()}
                >
                  Solicitar reserva
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
