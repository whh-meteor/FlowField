import React from 'react';
import { InputNumber, Slider } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  flex: 1;
  margin: 0;
  
  @media (max-width: 767px) {
    padding: 8px 0;
    
    .ant-slider-handle {
      width: 20px;
      height: 20px;
      margin-top: -9px;
    }
  }
`;

const StyledInputNumber = styled(InputNumber<number>)`
  width: 80px !important;
`;

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  precision,
}) => {
  const handleInputNumberChange = (val: number | null) => {
    if (val !== null && onChange) {
      onChange(val);
    }
  };

  return (
    <Container>
      <StyledSlider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <StyledInputNumber
        value={value}
        onChange={handleInputNumberChange}
        min={min}
        max={max}
        step={step}
        precision={precision}
      />
    </Container>
  );
};

export default NumberInput; 