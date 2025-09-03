"use client"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

/*COMPONENTIZAÇÃO DA TABELA*/

export type BenefitsTable = {
  headers: {
    firstColumn: string
    contabilidade: React.ReactNode
    market: string
  }
  lines: Array<{
    text: string;
    marketValue: number;
    marketFrequency: 'monthly' | 'yearly'
  }>
}



export const benefits: BenefitsTable = {
  headers: {
    firstColumn: "Benefícios inclusos no seu pacote",
    contabilidade: <><Image src="/table-logo.png" alt="Contabilidade Logo" width={32.17} height={40} className="mx-auto" /></>,
    market: "Média de Mercado"
  },
  lines: [
    {
      text: "Certificado Digital",
      marketFrequency: 'yearly',
      marketValue: 200
    },
    {
      text: "Abertura de empresa, 100% digital",
      marketFrequency: 'yearly',
      marketValue: 700
    },
    {
      text: "Contabilidade Consultiva",
      marketFrequency: 'monthly',
      marketValue: 5880
    },
    {
      text: "Conta PJ gratuita, digital e integrada ã sua contabilidade",
      marketFrequency: "yearly",
      marketValue: 756
    },
    {
      text: "Atendimento personalizado por telefone e WhatsApp a partir do plano de entrada",
      marketFrequency: 'yearly',
      marketValue: 1920
    }
  ]
}
/*PARA A MELHOR RESPONSIVIDADE A TABELA É CONVERTIDA EM CARDS EM DISPOSITIVOS MÓVEIS*/
/*FUNÇÃO DISPOSITIVOS MÓVEIS*/
export function BenefitsCardComponent({ benefits }: { benefits: BenefitsTable }) {
  return (
    <div className="md:hidden flex flex-col gap-5 justify-center mx-auto items-center">
      {benefits.lines.map((item, index) => (
        <div key={index} className="flex flex-col bg-neutral-50 shadow-md gap-4 rounded-2xl w-[60%] px-4 py-8 dark:text-black dark:bg-neutral-200">
          <h3 className="text-center text-xl font-bold">
            {item.text}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center text-primary">
              {benefits.headers.contabilidade}
              <span>Incluso</span>
            </div>
            <div className="flex flex-col justify-center items-center text-red-950 text-center">
              {benefits.headers.market}
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.marketValue)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/*FUNÇÃO PARA A TABELA NOS DISPOSITIVOS RESTANTES*/
/*PARA ALCANÇAR O PADRÃO MAIS PRÓXIMO POSSÍVEL DO DESEJADO VEREMOS NO CÓDIGO NÚMEROS FRACIONADOS*/
/*POR BOAS PRÁTICAS SERIA IDEAL QUE OS VALORES FOSSEM ARREDONDADOS*/

export function BenefitsTableComponent({ benefits }: { benefits: BenefitsTable }) {
  return (
    <table className="w-full max-w-[986px] max-h-[495px] hidden md:block">
      <thead>
        <tr className="border-b border-primary align-middle">
          <th colSpan={3} className="p-[10px] w-[557px] text-left text-primary text-[22px]">
            {benefits.headers.firstColumn}
          </th>
          <th className="p-[10px] bg-neutral-50 rounded-t-2xl py-[32.16px] align-middle w-[208px]">
            {benefits.headers.contabilidade}
          </th>
          <th className="pl-[29px] pt-[22px] font-normal text-[22px]">
            {benefits.headers.market}
          </th>
        </tr>
      </thead>
      <tbody>
        {benefits.lines.map((item, index) => (
          <tr key={index}>
            <td colSpan={3} key={index} className={`p-[10px] h-[78px] w-[557px] border-b border-neutral-100 font-medium text-[18px] ${index === benefits.lines.length - 1 ? "border-none" : ""}`}>
              {item.text}
            </td>
            <td className={`p-[10px] h-[78px] border-b-1 border-neutral-100 dark:text-green-800 text-primary font-bold text-center text-[18px] bg-gray-50 ${index === benefits.lines.length - 1 ? "rounded-b-[12px] border-none" : ""}`}>
              Incluso
            </td>
            <td className={`h-[78px] border-b-1 border-neutral-100 text-left text-[18px] ${index === benefits.lines.length - 1 ? "border-none" : ""}`}>
              <div className="w-[150px] mx-auto">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.marketValue)}{item.marketFrequency === 'monthly' ? '/mês' : "/ano"}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Home() {
  const searchParams = useSearchParams();
  const rawCidade = searchParams.get("cidade");

  // Faz o parser: mantém apenas letras, espaços e hífens
  const cidade = rawCidade
    ? `em ${decodeURIComponent(rawCidade).trim().replace(/[^a-zA-ZÀ-ÿ\s-]/g, "")}`
    : "no Brasil";
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-12 py-7 md:py-44 w-full">
        <h2 className="text-3xl text-center md:max-w-[630px] md:text-[42px] font-[Poppins] font-medium leading-[120%] tracking-[-1%]">
          Por que a <span className="text-primary">Contabilidade.com </span>
          é a melhor opção {cidade}?
        </h2>
        <BenefitsTableComponent benefits={benefits} />
        <BenefitsCardComponent benefits={benefits} />
        <div className="text-primary flex flex-row items-center gap-6">
          <Image src="/icon-coin.png" alt="Icone de uma moeda de dolar" width="62" height="62" /> <p>
            Uma economia média de <b>R$ 9.456/ano</b>
          </p>
        </div>
        <Button className="h-[60px] w-[280px] rounded-[58px]" variant={"secondary"}>
          Abrir empresa grátis
        </Button>
      </section>
    </div>
  );
}
