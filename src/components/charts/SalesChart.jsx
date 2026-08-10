import Card from '../ui/Card';
import LineChart from './LineChart';
import { formatCurrency } from '../../utils/formatters';

export default function SalesChart({ data, className }) {
  return (
    <Card
      title="Sales Performance"
      subtitle="Net sales across all distributors and territories"
      className={className}
    >
      <LineChart data={data} formatValue={formatCurrency} height={240} />
    </Card>
  );
}
