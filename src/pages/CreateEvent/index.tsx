import Step1 from "components/Event/Create/Step1";
import Step2 from "components/Event/Create/Step2";
import { IEvent } from "interfaces/IEvent";
import { instance } from "providers/api";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EventService } from "services/EventService";

const CreateEventForm = () => {
  const methods = useForm();
  const { handleSubmit, formState, getValues, setValue, reset } = methods;
  const { isSubmitting } = formState;
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCep = async () => {
    try {
      const response = await instance.get(
        `https://viacep.com.br/ws/${getValues("locationCEP")}/json/`
      );

      setValue("location", response.data.logradouro);
      setValue("locationCity", response.data.localidade);
      setValue("locationCEP", response.data.cep);
      setValue("district", response.data.bairro);
      setValue("uf", response.data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateEvent = async (data: IEvent) => {
    const res = await EventService.createEvent({
      ...data,
      id_user: parseInt(localStorage.getItem("dd") || ""),
    });

    if (res.status === 200) {
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
    reset();
    setCurrentStep(1);
  };
  return (
    <FormProvider {...methods}>
      <form className="max-w-md mx-auto">
        {currentStep === 1 && <Step1 formState={formState} />}
        {currentStep === 2 && (
          <Step2 formState={formState} onBlur={handleCep} />
        )}

        <div className="mt-4 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Voltar
            </button>
          )}

          {currentStep < 2 && (
            <button
              type="submit"
              disabled={!formState.isValid || isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              onClick={nextStep}
            >
              Próximo
            </button>
          )}

          {currentStep === 2 && (
            <button
              disabled={!formState.isValid || isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              onClick={handleSubmit(handleCreateEvent)}
            >
              Criar Evento
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateEventForm;
