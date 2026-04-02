import { createContext, useContext, useEffect, useState } from "react";

type ClassificationModelContextType = {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
};

const ClassificationModelContext =
  createContext<ClassificationModelContextType>({
    selectedModel: "Model-RDC-1.1",
    setSelectedModel: () => {},
  });

export function ClassificationModelProvider({ children }: any) {
  const [selectedModel, setSelectedModelState] = useState("Model-RDC-1.1");

  useEffect(() => {
    const saved = localStorage.getItem("classification-model");
    if (saved) setSelectedModelState(saved);
  }, []);

  const setSelectedModel = (model: string) => {
    setSelectedModelState(model);
    localStorage.setItem("classification-model", model);
  };

  return (
    <ClassificationModelContext.Provider
      value={{ selectedModel, setSelectedModel }}
    >
      {children}
    </ClassificationModelContext.Provider>
  );
}

export function useClassificationModel() {
  return useContext(ClassificationModelContext);
}
