
import { useState, useEffect } from "react";
import { Trash2, Pencil, Save, X, Calculator } from "lucide-react";
import { calculatorsMaster } from "../components/calculators/calculatorsList";

export default function AdminCalculators() {

  const [calculators, setCalculators] = useState(() => {

    const saved = JSON.parse(localStorage.getItem("calculators")) || [];

    return calculatorsMaster.map(master => {
      const found = saved.find(s => s.id === master.id);
      return found ? found : { ...master, status: true };
    });

  });

  useEffect(() => {
    localStorage.setItem("calculators", JSON.stringify(calculators));
  }, [calculators]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", category: "" });


  const toggleStatus = id => {
    setCalculators(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: !c.status } : c
      )
    );
  };

  const deleteCalc = id => {
    if (!confirm("Delete calculator?")) return;
    setCalculators(prev => prev.filter(c => c.id !== id));
  };

  const startEdit = calc => {
    setEditId(calc.id);
    setEditData({ name: calc.name, category: calc.category });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", category: "" });
  };

  const saveEdit = id => {
    setCalculators(prev =>
      prev.map(c =>
        c.id === id ? { ...c, ...editData } : c
      )
    );
    setEditId(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
          <Calculator />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Calculators Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage all financial calculators
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100 text-slate-700 text-sm">
            <tr>
              <th className="p-5 text-left">Calculator</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {calculators.map(calc => (
              <tr key={calc.id} className="border-t hover:bg-slate-50">

                <td className="p-5">
                  {editId === calc.id ? (
                    <input
                      value={editData.name}
                      onChange={e =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg w-full"
                    />
                  ) : calc.name}
                </td>

                <td className="text-center">
                  {editId === calc.id ? (
                    <input
                      value={editData.category}
                      onChange={e =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg"
                    />
                  ) : calc.category}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => toggleStatus(calc.id)}
                    className={`px-4 py-1 rounded-full text-xs font-semibold
                      ${calc.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {calc.status ? "Active" : "Disabled"}
                  </button>
                </td>

                <td className="text-center space-x-2">

                  {editId === calc.id ? (
                    <>
                      <button onClick={() => saveEdit(calc.id)} className="p-2 bg-green-100 rounded-lg">
                        <Save size={18}/>
                      </button>

                      <button onClick={cancelEdit} className="p-2 bg-gray-200 rounded-lg">
                        <X size={18}/>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(calc)} className="p-2 bg-blue-100 rounded-lg">
                        <Pencil size={18}/>
                      </button>

                      <button onClick={() => deleteCalc(calc.id)} className="p-2 bg-red-100 rounded-lg">
                        <Trash2 size={18}/>
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}