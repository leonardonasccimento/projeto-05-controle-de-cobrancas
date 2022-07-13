import './styles.css';
import { Stepper } from '@mui/material';

const steps = [
    {
        label: 'Cadastre-se',
        description: `Por favor, escreva seu nome e e-mail`,
    },
    {
        label: 'Escolha uma senha',
        description: 'Escolha uma senha segura',
    },
    {
        label: 'Cadastro realizado com sucesso',
        description: `E-mail e senha cadastrados com sucesso`,
    },
];

function CustomStepper({ activeStep, setActiveStep }) {
  return (
    <div className="stepper">
      <Stepper activeStep={activeStep} orientation="vertical">
        <div className="box-stepper">
          <div className="vertical"></div>
          <div className="circle">
            <div className="intern-circle"></div>
          </div>
          <div className="label-card">
            <label className="montserrat-18">{steps[0].label}</label>
            <label className="nunito-16">{steps[0].description}</label>
          </div>
        </div>

        <div className="box-stepper">
          <div className="vertical-next"></div>
          <div
            className="circle"
            style={{
              backgroundColor: activeStep.secondSection ? "#0E8750" : "#fff",
            }}
          >
            <div
              className="intern-circle"
              style={{
                backgroundColor: activeStep.secondSection ? "#fff" : "#0E8750",
              }}
            ></div>
          </div>

          <div className="label-card">
            <label className="montserrat-18">{steps[1].label}</label>
            <label className="nunito-16">{steps[1].description}</label>
          </div>
        </div>

        <div className="box-stepper">
          <div
            className="circle"
            style={{
              backgroundColor: activeStep.thirdSection ? "#0E8750" : "#fff",
            }}
          >
            <div
              className="intern-circle"
              style={{
                backgroundColor: activeStep.secondSection ? "#fff" : "#0E8750",
              }}
            ></div>
          </div>

          <div className="label-card">
            <label className="montserrat-18">{steps[2].label}</label>
            <label className="nunito-16">{steps[2].description}</label>
          </div>
        </div>
      </Stepper>
    </div>
  );
}

export default CustomStepper;