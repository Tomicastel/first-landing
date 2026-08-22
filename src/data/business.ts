export type MembershipPlan = {
  name: string
  price: string
  details: string[]
  accent: boolean
}

export type BusinessData = {
  name: string
  shortName: string
  address: string
  email: string
  phone: string
  whatsappUrl: string
  emailUrl: string
}

export const business: BusinessData = {
  name: "Athletix Fitness",
  shortName: "ATHLETIX",
  address: "Balcarce 1230, Rosario, Santa Fe",
  email: "tomas.castellano@outlook.com",
  phone: "+54 9 340 646-2210",
  whatsappUrl: `https://wa.me/5493406462210?text=${encodeURIComponent("Hola, quiero consultar sobre las membresías de Athletix Fitness.")}`,
  emailUrl: "mailto:tomas.castellano@outlook.com",
}

export const membershipPlans: MembershipPlan[] = [
  {
    name: "BÁSICO",
    price: "40,000",
    details: [
      "8 clases al mes",
      "Acceso a zona de fuerza",
      "Evaluación inicial",
    ],
    accent: false,
  },
  {
    name: "PRO",
    price: "60,000",
    details: [
      "Clases ilimitadas",
      "Recovery Lab incluido",
      "Plan de progreso mensual",
      "Reserva prioritaria",
    ],
    accent: true,
  },
  {
    name: "VIP",
    price: "80,000",
    details: [
      "Todo lo de Pro",
      "2 PT sessions / mes",
      "Nutrición deportiva",
      "Invitado mensual",
    ],
    accent: false,
  },
]
