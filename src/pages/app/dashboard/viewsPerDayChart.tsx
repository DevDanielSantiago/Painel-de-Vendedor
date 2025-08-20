import { useQuery } from '@tanstack/react-query'
import { Calendar04Icon, UserMultipleIcon } from 'hugeicons-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

import { getViewsPerDayInLast30Days } from '../../../api/get-views-per-day-in-last-30-days'
import Spinner from '../../../components/sppiner'

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const date = new Date(label)
    const day = date.getDate()
    const monthName = date.toLocaleString('pt-BR', { month: 'long' })

    return (
      <div className="box-shadow flex w-[146px] flex-col gap-2 rounded-lg bg-white p-3">
        <p className="label-sm text-gray-400">{`${day} de ${monthName}`}</p>

        <div className="flex items-center gap-2">
          <UserMultipleIcon className="h-4 w-4" />

          <p className="body-xs text-gray-300">{payload[0].value} visitantes</p>
        </div>
      </div>
    )
  }

  return null
}

export function ViewsPerDayChart() {
  const { data: viewsPerDay, isLoading: isLoadingViewsPerDay } = useQuery({
    queryKey: ['metrics', 'get-views-per-day-in-last-30-days'],
    queryFn: getViewsPerDayInLast30Days,
  })

  function dateFormatter(date: Date): string {
    const day = date.getDate()
    const monthName = date.toLocaleString('pt-BR', { month: 'long' })
    return `${day} de ${monthName}`
  }

  const currentDate = new Date()
  const dateThirtyDaysAgo = new Date()
  dateThirtyDaysAgo.setDate(currentDate.getDate() - 30)

  const formattedCurrentDate = dateFormatter(currentDate)
  const formattedDateThirtyDaysAgo = dateFormatter(dateThirtyDaysAgo)

  return (
    <div className="flex h-full flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="title-sm text-gray-500">Visitantes</h2>

        <div className="flex items-center justify-center gap-2">
          <Calendar04Icon className="h-4 w-4 text-blue-dark" />

          <span className="label-sm text-gray-300">
            {formattedDateThirtyDaysAgo} - {formattedCurrentDate}
          </span>
        </div>
      </div>

      {isLoadingViewsPerDay ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={viewsPerDay} style={{ fontSize: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              stroke="#949494"
              dataKey="date"
              tickFormatter={(dateString: string) =>
                new Date(dateString).getDate().toString()
              }
              axisLine={false}
              tickLine={false}
              dy={18}
            />
            <YAxis
              stroke="#949494"
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              stroke="#5EC5FD"
              type="natural"
              strokeWidth={2}
              dataKey="amount"
              activeDot={{ r: 5 }}
              // dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
