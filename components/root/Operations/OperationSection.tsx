"use client";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { MapPinIcon } from "@heroicons/react/24/solid";

const OperationSection = () => {
  const sections = [
    {
      id: "operation",
      title: "Areas of Operation",
      icon: <MapPinIcon className="w-8 h-8 text-white" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "CHEPTERWAI",
            "KIPKAREN",
            "KURGUNG/SURUNGAI",
            "KABIYET",
            "NDALAT",
            "KABISAGA",
            "SANGALOKEBULONIK",
          ].map((ward, index) => (
            <motion.div
              key={ward}
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-purple-50 rounded-tl-lg rounded-bl-lg p-4 cursor-pointer border-r-4 border-purple-500"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold">
                  {index + 1}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-purple-800">{ward}</h4>
                <p className="text-sm text-purple-600 mt-1">
                  Ward of Kipkelion West Sub-County
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "stakeholders",
      title: "Our Stakeholders",
      icon: <UsersIcon className="w-8 h-8 text-white" />,
      content: (
        <div className="space-y-4">
          {[
            "Parents",
            "Guardians",
            "Children",
            "Community Administrations",
          ].map((group) => (
            <motion.div
              key={group}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-purple-800 font-medium">{group}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "partners",
      title: "Our Partners",
      icon: <FaHandshake className="w-8 h-8 text-white" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "NGOs Coordination Board",
            "Public Benefit Organizations Authority",
            "Schools",
            "Ministry of Education",
            "Health Centres",
            "Ministry of Health",
            "Forest Conservation Organizations",
          ].map((partner) => (
            <motion.div
              key={partner}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 bg-gray-100 rounded-lg p-4 sm:p-6 cursor-pointer w-full"
            >
              <div className="p-1 bg-purple-400 rounded-full flex-shrink-0">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-purple-800 font-medium text-sm sm:text-base">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>
      ),
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
            Our Network & Reach
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-800 cursor-pointer">
                <div className="flex items-center gap-4 text-white">
                  {section.icon}
                  <h3 className="text-xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <ChevronDownIcon className="w-6 h-6 text-purple-200 transform transition-transform duration-300" />
              </div>

              <div className="p-6">{section.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationSection;
