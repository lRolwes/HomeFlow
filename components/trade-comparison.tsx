"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { trades, tasks, homePlans } from "@/lib/mock-trade-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type Metric = "days" | "cost";

type Trade = (typeof trades)[0];

export function TradeComparison() {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [selectedPlan, setSelectedPlan] = useState(homePlans[0]);
  const [selectedTrades, setSelectedTrades] = useState<typeof trades>([]);
  const [selectedMetric, setSelectedMetric] = useState<Metric>("days");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const tasksForTrade = (trade: (typeof trades)[0]) =>
    trade.taskEstimates.map((est) => est.taskId);

  const tradesForTask = trades.filter((trade) =>
    tasksForTrade(trade).includes(selectedTask.id)
  );

  const addTrade = (trade: (typeof trades)[0]) => {
    setSelectedTrades([...selectedTrades, trade]);
  };

  const removeTrade = (trade: (typeof trades)[0]) => {
    setSelectedTrades(selectedTrades.filter((t) => t.id !== trade.id));
  };

  const toggleSelectAll = () => {
    selectedTrades.length === trades.length
      ? setSelectedTrades([])
      : setSelectedTrades(trades);
  };

  const getTradeValue = (trade: (typeof trades)[0]) => {
    const estimate = trade.taskEstimates.find(
      (est) => est.taskId === selectedTask.id && est.planId === selectedPlan.id
    );
    return estimate ? estimate[selectedMetric as keyof typeof estimate] : 0;
  };

  const toggleCompany = (companyId: number) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const toggleSection = (taskName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [taskName]: !prev[taskName]
    }));
  };

  const applyFilters = () => {
    const filteredTrades = trades.filter(trade => 
      selectedCompanies.length === 0 || selectedCompanies.includes(trade.id)
    );
    setSelectedTrades(filteredTrades);
    setIsFilterOpen(false);
  };

  // Group trades by their current task
  const groupedTrades = tasks.reduce((acc, task) => {
    const tradesForTask = trades.filter(trade => 
      trade.taskEstimates.some(est => est.taskId === task.id)
    );
    if (tradesForTask.length > 0) {
      acc[task.name] = tradesForTask;
    }
    return acc;
  }, {} as Record<string, typeof trades>);

  // Sort tasks in the order they appear in the tasks array
  const sortedTaskNames = tasks.map(task => task.name).filter(name => groupedTrades[name]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dark-100">
          Trade Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="task"
              className="block text-sm font-medium text-dark-100 mb-1"
            >
              Task
            </label>
            <select
              id="task"
              value={selectedTask.id}
              onChange={(e) =>
                setSelectedTask(
                  tasks.find((t) => t.id === Number(e.target.value))!
                )
              }
              className="mt-1 block w-full pl-2 pr-6 py-2 text-sm border border-light-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
            >
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-dark-100 mb-1"
            >
              Home Plan
            </label>
            <select
              id="plan"
              value={selectedPlan.id}
              onChange={(e) =>
                setSelectedPlan(
                  homePlans.find((p) => p.id === Number(e.target.value))!
                )
              }
              className="mt-1 block w-full pl-1 pr-8 py-2 text-sm border border-light-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
            >
              {homePlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-100 mb-1">
              Rank By
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-dark-100">Days</span>
              <Switch
                checked={selectedMetric === "cost"}
                onChange={() =>
                  setSelectedMetric(selectedMetric === "days" ? "cost" : "days")
                }
                className={`${
                  selectedMetric === "cost" ? "bg-blue-300" : "bg-light-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    selectedMetric === "cost" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="text-sm text-dark-100">Cost</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="filter"
              className="block text-sm font-medium text-white mb-1"
            >
              Filter
            </label>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button
                  id="filter"
                  onClick={() => setIsFilterOpen(true)}
                  className="mt-1 block w-full pl-3 pr-3 py-2 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-blue-300 text-center hover:bg-blue-100 transition-colors"
                >
                  Filter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Filter Companies by Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {sortedTaskNames.map((taskName) => (
                    <div key={taskName} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(taskName)}
                        className="w-full flex items-center justify-between p-3 bg-light-100 hover:bg-light-200 transition-colors"
                      >
                        <span className="font-medium">{taskName}</span>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            expandedSections[taskName] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedSections[taskName] && (
                        <div className="p-3 space-y-2">
                          {groupedTrades[taskName].map((trade) => (
                            <div key={trade.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`company-${trade.id}`}
                                checked={selectedCompanies.includes(trade.id)}
                                onCheckedChange={() => toggleCompany(trade.id)}
                              />
                              <label
                                htmlFor={`company-${trade.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {trade.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="h-[400px] overflow-y-auto rounded-lg border border-light-200">
          <div className="sticky top-0 bg-light-50 border-b border-light-200 px-4 py-2 flex justify-between items-center">
            <span className="font-medium text-dark-100 text-sm">Trade</span>
            <span className="font-medium text-dark-100 text-sm">
              {selectedMetric === "cost" ? "Cost" : "Days"}
            </span>
          </div>
          <div className="divide-y divide-light-200">
            {selectedTrades
              .filter((trade) => getTradeValue(trade) > 0)
              .sort((a, b) => getTradeValue(a) - getTradeValue(b))
              .map((trade) => (
                <div
                  key={trade.id}
                  className="px-4 py-3 hover:bg-light-100 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-dark-100 font-medium text-sm">{trade.name}</span>
                  <span className="text-dark-100 text-sm">
                    {selectedMetric === "cost" ? "$" : ""}
                    {getTradeValue(trade).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                    {selectedMetric === "days" ? " days" : ""}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
