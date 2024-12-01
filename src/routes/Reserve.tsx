import { useEffect, useMemo, useState } from "react";
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
import ReservationDocument, {
  AreasEnum,
  StatusEnum,
} from "@/lib/firebase/schemas/ReservationDocument";
import {
  convertDateToTimeString,
  convertTimeStringToDate,
  getTimeStringArray,
} from "@/lib/time-helper";
import { toast } from "react-toastify";
import { createReservation } from "@/lib/firebase/reservations";
import { RotatingLines } from "react-loader-spinner";

export default function Reserve() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [telephone, setTelephone] = useState<E164Number | undefined>();
  const [area, setArea] = useState<AreasEnum | undefined>();
  const [reservationDate, setReservationDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  const [user, loading] = useAuth();

  const timeOptions = useMemo(() => getTimeStringArray(6, 19, 30), []);

  const navigate = useNavigate();

  useEffect(() => {
    setStartTime(undefined);
    setEndTime(undefined);
  }, [reservationDate, setStartTime, setEndTime]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/not-authenticated?redirect_to=/reserve", {
      replace: true,
    });
    return null;
  }

  const isTimeSelectable = (time: Date) => {
    return startTime && time > startTime;
  };

  const validateDate = () => {
    return startTime && endTime && endTime > startTime;
  };

  const validateForm = () => {
    return (
      name &&
      email &&
      telephone &&
      area &&
      reservationDate &&
      startTime &&
      endTime &&
      validateDate()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      email,
      telephone,
      area,
      reserveDate: reservationDate,
      startTime,
      endTime,
    });

    if (!validateDate()) {
      toast.error("O horário de fim deve ser depois do horário de início.");
      return;
    }

    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    const reservation: ReservationDocument = {
      uid: user.uid,

      name: name!,
      email: email!,
      phone: telephone!,
      area: area!,
      reservationDate: reservationDate!,
      startTime: startTime!,
      endTime: endTime!,

      status: StatusEnum.PENDING,
    };

    try {
      await createReservation(reservation);
      toast.success("Reserva criada com sucesso");
      setIsLoading(false);

      navigate("/schedule");
    } catch (error) {
      console.error("Erro ao criar reserva", error);
      toast.error("Erro ao criar reserva");
    }

    setIsLoading(false);
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
        <Card className="w-full max-w-xl overflow-hidden">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email do utilizador*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <Select
                        value={area}
                        onValueChange={(value) => setArea(value as AreasEnum)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um ambiente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={AreasEnum.MACHINING}>
                            Usinagem
                          </SelectItem>
                          <SelectItem value={AreasEnum.CARPENTRY}>
                            Carpentaria
                          </SelectItem>
                          <SelectItem value={AreasEnum.WELDING}>
                            Solda
                          </SelectItem>
                          <SelectItem value={AreasEnum.PAINTING}>
                            Pintura
                          </SelectItem>
                          <SelectItem value={AreasEnum.LASER_CUTTING}>
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
                    value={reservationDate?.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const selectedDate = e.target.value;

                      setReservationDate(new Date(selectedDate + "T00:00:00"));
                    }}
                    min={today}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label htmlFor="startTime">Inicio*</Label>
                    <Select
                      disabled={!reservationDate}
                      value={convertDateToTimeString(startTime)}
                      onValueChange={(value) => {
                        if (!reservationDate) return;
                        const startTimeDate = convertTimeStringToDate(
                          value,
                          reservationDate
                        );
                        setStartTime(startTimeDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Horário de início"} />
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
                      disabled={!reservationDate}
                      value={convertDateToTimeString(endTime)}
                      onValueChange={(value) => {
                        if (!reservationDate) return;
                        const endTimeDate = convertTimeStringToDate(
                          value,
                          reservationDate
                        );
                        setEndTime(endTimeDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Horário de fim"} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => {
                          const isSelectable =
                            reservationDate &&
                            isTimeSelectable(
                              convertTimeStringToDate(time, reservationDate)
                            );

                          return (
                            <SelectItem
                              key={time}
                              value={time}
                              className={
                                !isSelectable
                                  ? "text-gray-400 pointer-events-none"
                                  : ""
                              }
                            >
                              {time}
                            </SelectItem>
                          );
                        })}
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
                  disabled={!validateForm() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RotatingLines
                        ariaLabel="chat-loading"
                        strokeColor="white"
                      />
                      Criando reserva...
                    </>
                  ) : (
                    <>Solicitar reserva</>
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
