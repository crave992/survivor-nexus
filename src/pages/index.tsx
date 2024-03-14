import Image from "next/image";
import { Inter } from "next/font/google";
import StandardLayout from "@/components/layouts/StandardLayout";
import { useSurvivorCrud } from '@/utils/useSurvivorsCrud';
import { Card, CardContent, Typography } from '@mui/material';

const inter = Inter({ subsets: ["latin"] });

export default function ReportsPage() {
  const { survivors, percentageInfected, percentageNonInfected, averageResourceAmount } = useSurvivorCrud();

  // Function to format the average resource amount with two decimal places
  const formatDecimal = (value: any) => {
    return parseFloat(value).toFixed(2);
  };

  return (
    <StandardLayout>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-300 rounded-lg shadow-md">
          <CardContent>
            <Typography variant="h6" className="text-gray-800" gutterBottom>
              Percentage of Infected Survivors
            </Typography>
            <Typography variant="h4" className="text-red-500 font-semibold">
              {percentageInfected().toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
        <Card className="border border-gray-300 rounded-lg shadow-md">
          <CardContent>
            <Typography variant="h6" className="text-gray-800" gutterBottom>
              Percentage of Non-Infected Survivors
            </Typography>
            <Typography variant="h4" className="text-green-500 font-semibold">
              {percentageNonInfected().toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
        <Card className="border border-gray-300 rounded-lg shadow-md">
          <CardContent>
            <Typography variant="h6" className="text-gray-800" gutterBottom>
              Average Resource Amounts
            </Typography>
            <ul className="text-gray-800">
              {Object.keys(averageResourceAmount()).map(resource => (
                <li key={resource} className="py-1">
                  {resource}: <span className="font-semibold">{formatDecimal(averageResourceAmount()[resource])}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
}
