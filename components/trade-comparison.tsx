"use client"
    
import { useState } from "react";
import { Switch } from "@headlessui/react";

const tasks = [
  { id: 1, name: "Framing" },
  { id: 2, name: "Electrical" },
  { id: 3, name: "Plumbing" },
  { id: 4, name: "HVAC" },
  { id: 5, name: "Insulation" },
  { id: 6, name: "Drywall" },
  { id: 7, name: "Painting" },
  { id: 8, name: "Flooring" },
  { id: 9, name: "Trim Carpentry" },
];

const homePlans = [
  { id: 1, name: "Princeton" },
  { id: 2, name: "Ashton" },
  { id: 3, name: "Glenwood" },
];

const trades = [
  { id: 1, name: "Thoroughbred Framing", taskEstimates: [
    { taskId: 1, planId: 1, days: 10.4, cost: 12500 },
    { taskId: 1, planId: 2, days: 9.8, cost: 11800 },
    { taskId: 1, planId: 3, days: 11.2, cost: 13200 },
  ]},
  { id: 2, name: "John's Framing", taskEstimates: [
    { taskId: 1, planId: 1, days: 11.1, cost: 13000 },
    { taskId: 1, planId: 2, days: 10.3, cost: 12200 },
    { taskId: 1, planId: 3, days: 11.9, cost: 13800 },
  ]},
  { id: 3, name: "Speedy Electric", taskEstimates: [
    { taskId: 2, planId: 1, days: 4.2, cost: 8500 },
    { taskId: 2, planId: 2, days: 3.9, cost: 8100 },
    { taskId: 2, planId: 3, days: 4.5, cost: 9000 },
  ]},
  { id: 4, name: "Volt Electric", taskEstimates: [
    { taskId: 2, planId: 1, days: 4.5, cost: 8800 },
    { taskId: 2, planId: 2, days: 4.2, cost: 8400 },
    { taskId: 2, planId: 3, days: 4.8, cost: 9300 },
  ]},
  { id: 5, name: "Pipe Dreams Plumbing", taskEstimates: [
    { taskId: 3, planId: 1, days: 3.8, cost: 7500 },
    { taskId: 3, planId: 2, days: 3.5, cost: 7200 },
    { taskId: 3, planId: 3, days: 4.1, cost: 7800 },
  ]},
];

type Metric = "days" | "dollars";

type Trade = (typeof trades)[0];

export function TradeComparison() {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [selectedPlan, setSelectedPlan] = useState(homePlans[0]);
  const [selectedTrades, setSelectedTrades] = useState<typeof trades>([]);
  const [selectedMetric, setSelectedMetric] = useState<Metric>("days");

  const tasksForTrade = (trade: (typeof trades)[0]) => 
    trade.taskEstimates.map(est => est.taskId);

  const tradesForTask = trades.filter(trade => 
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

  return (
    <div className="bg-light-50 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-dark-100">Trade Comparison</h1>

      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="task" className="block text-sm font-medium text-dark-100 mb-1">Task</label>
          <select
            id="task"
            value={selectedTask.id}
            onChange={(e) => setSelectedTask(tasks.find((t) => t.id === Number(e.target.value))!)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-100 focus:border-blue-100 sm:text-sm rounded-md"
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="plan" className="block text-sm font-medium text-dark-100 mb-1">Home Plan</label>
          <select
            id="plan"
            value={selectedPlan.id}
            onChange={(e) => setSelectedPlan(homePlans.find((p) => p.id === Number(e.target.value))!)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-100 focus:border-blue-100 sm:text-sm rounded-md"
          >
            {homePlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium text-dark-100">Days</span>
          <Switch
            checked={selectedMetric === "dollars"}
            onChange={() => 
              setSelectedMetric(selectedMetric === "days" ? "dollars" : "days")
            }
            className={`${
              selectedMetric === "dollars" ? 'bg-blue-100' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100`}
          >
            <span
              className={`${
                selectedMetric === "dollars" ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
          <span className="ml-2 text-sm font-medium text-dark-100">Dollars</span>
        </div>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={toggleSelectAll}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-100 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100"
        >
          Select Trades
        </button>
      </div>

      <div className="h-80 relative">
        {selectedTrades.map((trade, index) => (
          <div
            key={trade.id}
            className="absolute bottom-0 w-1/5 group mx-2"
            style={{ left: `${index * 20}%` }}
          >
            <div
              className="bg-blue-100 rounded-t-lg transition group-hover:bg-blue-300"
              style={{
                height: `${(getTradeValue(trade) / Math.max(...selectedTrades.map(getTradeValue))) * 100}%`,
                width: "80%",
                margin: "0 auto",
              }}
            ></div>
            <div className="mt-2 text-center text-sm text-dark-100 font-medium">{trade.name}</div>
            <div className="text-center text-sm text-dark-50">
              {getTradeValue(trade).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
              {selectedMetric === "days" ? " days" : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeSelectionModal({
  isOpen,
  onClose,
  trades,
  selectedTrades,
  setSelectedTrades,
}: {
  isOpen: boolean;
  onClose: () => void;
  trades: Trade[];
  selectedTrades: Trade[];
  setSelectedTrades: (trades: Trade[]) => void;
}) {
  const toggleSelectAll = () => {
    selectedTrades.length === trades.length
      ? setSelectedTrades([])
      : setSelectedTrades(trades);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Select Trades</h3>
            <div className="mt-4 space-y-2">
              {trades.map((trade: Trade) => (
                <div key={trade.id} className="flex items-center">
                  <input
                    id={`trade-${trade.id}`}
                    type="checkbox"
                    checked={selectedTrades.some((t) => t.id === trade.id)}
                    onChange={() =>
                      selectedTrades.some((t) => t.id === trade.id)
                        ? setSelectedTrades(selectedTrades.filter((t) => t.id !== trade.id))
                        : setSelectedTrades([...selectedTrades, trade])
                    }
                    className="h-4 w-4 text-blue-100 focus:ring-blue-200 border-gray-300 rounded"
                  />
                  <label htmlFor={`trade-${trade.id}`} className="ml-2 block text-sm text-dark-100">
                    {trade.name}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleSelectAll}
              className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-100 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100"
            >
              {selectedTrades.length === trades.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
