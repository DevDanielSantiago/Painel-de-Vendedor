import { Helmet } from 'react-helmet-async'

import { AvailableProductsInLast30Days } from './availableProductsInLast30Days'
import { SoldProductsInLast30Days } from './soldProductsInLast30Days'
import { ViewsPerDayChart } from './viewsPerDayChart'
import { ViewsReceivedInLast30Days } from './viewsReceivedInLast30Days'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="mb-10 mt-16 flex flex-col gap-2">
        <h2 className="title-md text-gray-500">Últimos 30 dias</h2>

        <p className="body-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex w-[239px] flex-col gap-[15px]">
          <SoldProductsInLast30Days />
          <AvailableProductsInLast30Days />
          <ViewsReceivedInLast30Days />
        </div>

        <div className="flex-1 rounded-[20px] bg-white px-6 pb-5 pt-6">
          <ViewsPerDayChart />
        </div>
      </div>
    </>
  )
}
