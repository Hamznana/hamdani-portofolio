import { useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { Layers, Database, Cpu, Smartphone, Wrench } from "lucide-react";

const Skills = () => {
  const { config } = useContext(PortfolioContext);
  const { skills } = config;
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "Mobile", "Tools"];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Frontend":
        return <Layers size={14} className="text-violet-400" />;
      case "Backend":
        return <Cpu size={14} className="text-fuchsia-400" />;
      case "Database":
        return <Database size={14} className="text-cyan-400" />;
      case "Mobile":
        return <Smartphone size={14} className="text-emerald-400" />;
      case "Tools":
        return <Wrench size={14} className="text-amber-400" />;
      default:
        return null;
    }
  };

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 bg-black/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Skills & Expertise</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            My Technical Stack
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20"
                  : "glass text-gray-400 hover:text-white hover:bg-white/5 border-white/5"
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-6 rounded-2xl glass-card relative overflow-hidden group flex flex-col justify-between transition-all duration-300"
            >
              {/* Background glow hover item */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent blur-md rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div className="mb-4">
                {/* Skill Badge Category */}
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wider">
                  {getCategoryIcon(skill.category)}
                  <span>{skill.category}</span>
                </span>

                {/* Skill Name */}
                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {skill.name}
                </h4>
              </div>

              {/* Progress Bar Area */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-gray-500">Proficiency</span>
                  <span className="text-violet-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
