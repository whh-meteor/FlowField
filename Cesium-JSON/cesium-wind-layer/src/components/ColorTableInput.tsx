import React, { useState, useMemo } from 'react';
import { Select, ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { SwapOutlined } from '@ant-design/icons';
import {
  interpolateRainbow,
  interpolateViridis,
  interpolateCool,
  interpolateWarm,
  interpolateInferno,
  interpolateMagma,
  interpolatePlasma,
  interpolateBlues,
  interpolateGreens,
  interpolateOranges,
  interpolateReds,
  interpolatePurples,
  interpolateBuGn,
  interpolateBuPu,
  interpolateCividis,
  interpolateCubehelixDefault,
  interpolateGnBu,
  interpolateGreys,
  interpolateOrRd,
  interpolatePuBu,
  interpolatePuBuGn,
  interpolatePuRd,
  interpolateRdPu,
  interpolateSinebow,
  interpolateTurbo,
  interpolateYlGn,
  interpolateYlGnBu,
  interpolateYlOrBr,
  interpolateYlOrRd,
} from 'd3-scale-chromatic';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const SelectContainer = styled.div`
  flex: 1;
`;

const ColorPreview = styled.div`
  display: flex;
  height: 10px;
  width: 100%;
`;

const ColorSegment = styled.div<{ color: string }>`
  flex: 1;
  background-color: ${(props) => props.color};
`;

const ColorSchemeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorSchemeInfo = styled.div`
  flex: 1;
`;

const ColorSchemePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlipButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
  border-radius: 4px;
  margin-top: 4px;
  
  &:hover {
    color: rgba(0, 0, 0, 0.85);
    background: rgba(0, 0, 0, 0.04);
  }
  
  &:active {
    background: rgba(0, 0, 0, 0.08);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface ColorTableInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const generateColorTable = (
  interpolator: (t: number) => string,
  reverse: boolean = false,
): string[] => {
  const segments = 20;
  const colors = Array.from({ length: segments }).map((_, i) => {
    return interpolator(i / (segments - 1));
  });
  if (reverse) {
    return colors.reverse();
  }
  return colors;
};

const generateSingleColorTable = (color: string): string[] => {
  return Array(20).fill(color);
};

export const colorSchemes = [
  { label: 'Single Color', value: 'single', interpolator: () => '#FFFFFF', isSingleColor: true },
  { label: 'Rainbow', value: 'rainbow', interpolator: interpolateRainbow },
  { label: 'Turbo', value: 'turbo', interpolator: interpolateTurbo },
  { label: 'Viridis', value: 'viridis', interpolator: interpolateViridis },
  { label: 'Cool', value: 'cool', interpolator: interpolateCool },
  { label: 'Warm', value: 'warm', interpolator: interpolateWarm },
  { label: 'Inferno', value: 'inferno', interpolator: interpolateInferno },
  { label: 'Magma', value: 'magma', interpolator: interpolateMagma },
  { label: 'Plasma', value: 'plasma', interpolator: interpolatePlasma },
  { label: 'Cividis', value: 'cividis', interpolator: interpolateCividis },
  { label: 'Cubehelix', value: 'cubehelix', interpolator: interpolateCubehelixDefault },
  { label: 'Sinebow', value: 'sinebow', interpolator: interpolateSinebow },
  { label: 'Blues', value: 'blues', interpolator: interpolateBlues },
  { label: 'Greens', value: 'greens', interpolator: interpolateGreens },
  { label: 'Greys', value: 'greys', interpolator: interpolateGreys },
  { label: 'Oranges', value: 'oranges', interpolator: interpolateOranges },
  { label: 'Purples', value: 'purples', interpolator: interpolatePurples },
  { label: 'Reds', value: 'reds', interpolator: interpolateReds },
  { label: 'BuGn', value: 'bugn', interpolator: interpolateBuGn },
  { label: 'BuPu', value: 'bupu', interpolator: interpolateBuPu },
  { label: 'GnBu', value: 'gnbu', interpolator: interpolateGnBu },
  { label: 'OrRd', value: 'orrd', interpolator: interpolateOrRd },
  { label: 'PuBuGn', value: 'pubugn', interpolator: interpolatePuBuGn },
  { label: 'PuBu', value: 'pubu', interpolator: interpolatePuBu },
  { label: 'PuRd', value: 'purd', interpolator: interpolatePuRd },
  { label: 'RdPu', value: 'rdpu', interpolator: interpolateRdPu },
  { label: 'YlGnBu', value: 'ylgnbu', interpolator: interpolateYlGnBu },
  { label: 'YlGn', value: 'ylgn', interpolator: interpolateYlGn },
  { label: 'YlOrBr', value: 'ylorbr', interpolator: interpolateYlOrBr },
  { label: 'YlOrRd', value: 'ylorrd', interpolator: interpolateYlOrRd }
].map((item) => ({
  ...item,
  colors: item.isSingleColor 
    ? generateSingleColorTable(item.interpolator())
    : generateColorTable(item.interpolator),
}));

const ColorTableInput: React.FC<ColorTableInputProps> = ({
  value = [],
  onChange,
}) => {
  const [selectedScheme, setSelectedScheme] = useState(() => {
    const matchingScheme = colorSchemes.find(
      (scheme) => JSON.stringify(scheme.colors) === JSON.stringify(value),
    );
    return matchingScheme ? matchingScheme.value : 'rainbow';
  });

  const [singleColor, setSingleColor] = useState<string>(() => {
    if (value.length > 0 && value.every(color => color === value[0])) {
      return value[0];
    }
    return '#FFFFFF';
  });

  const [reversedSchemes, setReversedSchemes] = useState<Record<string, boolean>>({});

  const currentSchemes = useMemo(() => {
    return colorSchemes.map(scheme => {
      let colors = scheme.isSingleColor
        ? generateSingleColorTable(singleColor)
        : scheme.colors;
      
      if (reversedSchemes[scheme.value]) {
        colors = [...colors].reverse();
      }

      return {
        ...scheme,
        colors
      };
    });
  }, [singleColor, reversedSchemes]);

  const handleSchemeChange = (newValue: string) => {
    setSelectedScheme(newValue);
    const scheme = currentSchemes.find((s) => s.value === newValue);
    if (scheme) {
      if (scheme.isSingleColor) {
        const colors = generateSingleColorTable(singleColor);
        onChange?.(colors);
      } else {
        onChange?.(scheme.colors);
      }
    }
  };

  const handleColorChange = (color: Color) => {
    const hexColor = color.toHexString();
    setSingleColor(hexColor);
    if (selectedScheme === 'single') {
      const colors = generateSingleColorTable(hexColor);
      onChange?.(colors);
    }
  };

  const handleFlip = (schemeValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReversedSchemes(prev => {
      const newReversed = {
        ...prev,
        [schemeValue]: !prev[schemeValue]
      };
      
      if (schemeValue === selectedScheme) {
        const scheme = currentSchemes.find(s => s.value === schemeValue);
        if (scheme) {
          const newColors = [...scheme.colors].reverse();
          onChange?.(newColors);
        }
      }
      
      return newReversed;
    });
  };

  const renderColorPreview = (scheme: (typeof colorSchemes)[0]) => {
    const segments = 20;
    const colors = scheme.isSingleColor
      ? generateSingleColorTable(singleColor)
      : scheme.colors;

    return (
      <ColorSchemePreview>
        <ColorPreview>
          {Array.from({ length: segments }).map((_, i) => (
            <ColorSegment
              key={i}
              color={colors[i]}
            />
          ))}
        </ColorPreview>
        {!scheme.isSingleColor && (
          <FlipButton
            onClick={(e) => handleFlip(scheme.value, e)}
            title="Flip Colors"
          >
            <SwapOutlined />
          </FlipButton>
        )}
      </ColorSchemePreview>
    );
  };

  return (
    <Container>
      <SelectContainer>
        <Select
          style={{ width: '100%' }}
          value={selectedScheme}
          onChange={handleSchemeChange}
          labelRender={(selectedValue) => {
            const scheme = currentSchemes.find(
              (s) => s.value === selectedValue.value,
            );
            return scheme ? renderColorPreview(scheme) : null;
          }}
          options={currentSchemes.map((scheme) => ({
            value: scheme.value,
            label: (
              <ColorSchemeOption>
                <ColorSchemeInfo>
                  <div>{scheme.label}</div>
                  {renderColorPreview(scheme)}
                </ColorSchemeInfo>
              </ColorSchemeOption>
            ),
          }))}
        />
      </SelectContainer>
      {selectedScheme === 'single' && (
        <ColorPicker
          value={singleColor}
          onChange={handleColorChange}
          size="small"
        />
      )}
    </Container>
  );
};

export default ColorTableInput;
