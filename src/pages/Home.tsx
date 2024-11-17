import React, { useEffect, useState } from "react";
import { Center, Container, Title } from "@mantine/core";
import { fetchProcessedCropData } from "../services/fetchData";
import { AggregatedData, CropAverage, CropData } from "../types";
import Table1 from "../components/Table1";
import Table2 from "../components/Table2";

const Home: React.FC = () => {
  const [aggregatedByYear, setAggregatedByYear] = useState<AggregatedData[]>([]);
  const [averageByCrop, setAverageByCrop] = useState<CropAverage[]>([]);

  useEffect(() => {
    const data: CropData[] = fetchProcessedCropData();

    // Calculate Maximum and Minimum Production by Year
    const groupedByYear = data.reduce((acc, curr) => {
      acc[curr.year] = acc[curr.year] || [];
      acc[curr.year].push(curr);
      return acc;
    }, {} as Record<number, CropData[]>);

    const aggregated: AggregatedData[] = Object.entries(groupedByYear).map(
      ([year, crops]) => {
        const maxCrop = crops.reduce((prev, curr) =>
          curr.production > prev.production ? curr : prev
        );
        const minCrop = crops.reduce((prev, curr) =>
          curr.production < prev.production ? curr : prev
        );
        return { year: +year, maxCrop: maxCrop.crop, minCrop: minCrop.crop };
      }
    );
    setAggregatedByYear(aggregated);

    // Calculate Average Yield and Cultivation Area by Crop
    const groupedByCrop = data.reduce((acc, curr) => {
      acc[curr.crop] = acc[curr.crop] || { yield: 0, cultivationArea: 0, count: 0 };
      acc[curr.crop].yield += curr.yield;
      acc[curr.crop].cultivationArea += curr.cultivationArea;
      acc[curr.crop].count += 1;
      return acc;
    }, {} as Record<string, { yield: number; cultivationArea: number; count: number }>);

    const averages: CropAverage[] = Object.entries(groupedByCrop).map(([crop, values]) => ({
      crop,
      avgYield: values.yield / values.count,
      avgCultivationArea: values.cultivationArea / values.count,
    }));
    setAverageByCrop(averages);
  }, []);

  return (
    <Container>
      <Center><Title order={2} mt="md">Agriculture Data Analysis</Title></Center>
      <Center><Title order={4} mt="xl">
        Crop with Maximum and Minimum Production by Year
      </Title></Center>
      <Table1 data={aggregatedByYear} />

      <Center><Title order={4} mt="xl">
        Average Yield and Cultivation Area by Crop
      </Title></Center>
      <Table2 data={averageByCrop} />
    </Container>
  );
};

export default Home;
