import React, { useEffect, useState } from 'react';
import { Card, Switch, Space, Tooltip, Typography, Form, InputNumber } from 'antd';
import { WindLayer, WindLayerOptions } from 'cesium-wind-layer';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ColorTableInput from './ColorTableInput';
import styled from 'styled-components';
import { ZoomInOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import NumberInput from './NumberInput';

const { Text } = Typography;

// Styled components for compact layout
const CompactFormItem = styled(Form.Item)`
  margin-bottom: 8px !important;
  
  .ant-form-item-label {
    padding-bottom: 4px;
    > label {
      height: 24px;
    }
  }
  
  .ant-slider {
    margin: 4px 0;
    
    @media (max-width: 767px) {
      /* 增大触摸区域 */
      padding: 8px 0;
      
      .ant-slider-handle {
        width: 20px;
        height: 20px;
        margin-top: -9px;
      }
    }
  }
  
  .ant-switch {
    @media (max-width: 767px) {
      /* 增大开关大小 */
      min-width: 44px;
      height: 24px;
      
      &::after {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCard = styled(Card)`
  .ant-card-head {
    min-height: 40px;
    padding: 0 12px;
    
    .ant-card-head-title {
      padding: 8px 0;
    }
  }
  
  &.ant-card-small > .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
  
  @media (max-width: 767px) {
    width: 100% !important;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CollapseButton = styled.div<{ $collapsed: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    transition: transform 0.3s;
    transform: rotate(${props => props.$collapsed ? 0 : 180}deg);
  }
`;

const CardContent = styled.div<{ $collapsed: boolean }>`
  max-height: ${props => props.$collapsed ? '0' : 'calc(100vh - 300px)'};
  overflow: auto;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  padding: ${props => props.$collapsed ? '0 12px' : '12px'};
  
  @media (max-width: 767px) {
    max-height: ${props => props.$collapsed ? '0' : '60vh'};
    
    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 2px;
    }
  }
  
  > *:last-child {
    margin-bottom: 0;
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  user-select: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TitleText = styled.span`
  flex: 1;
`;

const ControlPanelContainer = styled.div`
  position: absolute;
  z-index: 1000;
  
  @media (min-width: 768px) {
    left: 20px;
    top: 20px;
  }
  
  @media (max-width: 767px) {
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 400px;
  }
`;

const TitleActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
  border-radius: 4px;
  
  &:hover {
    color: rgba(0, 0, 0, 0.85);
    background: rgba(0, 0, 0, 0.04);
  }
  
  &:active {
    background: rgba(0, 0, 0, 0.08);
  }

  // Prevent click event from bubbling up to parent
  &:focus {
    outline: none;
  }
`;

interface ControlPanelProps {
  windLayer: WindLayer | null;
  initialOptions?: Partial<WindLayerOptions>;
  onOptionsChange?: (options: Partial<WindLayerOptions>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  windLayer,
  initialOptions,
  onOptionsChange,
}) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<WindLayerOptions>({
    ...WindLayer.defaultOptions,
    ...initialOptions,
  });
  
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (initialOptions) {
      const newOptions = {
        ...options,
        ...initialOptions,
      };
      setOptions(newOptions);
      form.setFieldsValue(newOptions);
    }
  }, [initialOptions]);

  const renderLabel = (label: string, tooltip: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {label}
      <Tooltip title={tooltip}>
        <QuestionCircleOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
      </Tooltip>
    </div>
  );

  const handleValuesChange = (changedValues: Partial<WindLayerOptions>, allValues: WindLayerOptions) => {
    setOptions(allValues);
    
    if (changedValues.colors) {
      windLayer?.updateOptions({ colors: changedValues.colors });
    } else {
      windLayer?.updateOptions(changedValues);
    }

    onOptionsChange?.(changedValues);
  };

  return (
    <ControlPanelContainer>
      <StyledCard
        title={
          <CardTitle onClick={() => setCollapsed(!collapsed)}>
            <TitleText>Wind Layer Controls</TitleText>
            <TitleActions>
              <TitleButton
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(!visible);
                  if (windLayer) {
                    windLayer.show = !visible;
                  }
                }}
                title={visible ? "Hide Wind Layer" : "Show Wind Layer"}
              >
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </TitleButton>
              <TitleButton
                onClick={(e) => {
                  e.stopPropagation();
                  windLayer?.zoomTo(1);
                }}
                title="Zoom to Wind Field"
              >
                <ZoomInOutlined />
              </TitleButton>
              <CollapseButton $collapsed={collapsed}>
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="currentColor"
                >
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </svg>
              </CollapseButton>
            </TitleActions>
          </CardTitle>
        }
        size="small"
      >
        <CardContent $collapsed={collapsed}>
          <Form
            form={form}
            initialValues={initialOptions}
            onValuesChange={handleValuesChange}
            layout="vertical"
            size="small"
          >
            <Space direction="vertical" style={{ width: '100%' }} size={4}>
              <CompactFormItem
                name="particlesTextureSize"
                label={renderLabel(
                  'Particles Count',
                  'Size of the particle texture. Determines the maximum number of particles (size squared).'
                )}
                help={
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    Current: {Math.pow(options.particlesTextureSize, 2)} particles
                  </Text>
                }
              >
                <NumberInput min={1} max={2000} step={10} />
              </CompactFormItem>

              <CompactFormItem
                name="particleHeight"
                label={renderLabel(
                  'Particle Height',
                  'Height of particles above the ground in meters.'
                )}
              >
                <NumberInput min={-1000} max={10000} step={1} />
              </CompactFormItem>

              <CompactFormItem
                label={renderLabel(
                  'Line Width Range',
                  'Width range of particle trails in pixels. Lower values for thinner lines, higher values for thicker ones.'
                )}
              >
                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <CompactFormItem
                        name={['lineWidth', 'min']}
                        label={
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Min Width
                          </Text>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          min={0.1}
                          max={10}
                          step={0.1}
                          precision={1}
                          placeholder='Min Width'
                        />
                      </CompactFormItem>
                    </div>
                    <div style={{ flex: 1 }}>
                      <CompactFormItem
                        name={['lineWidth', 'max']}
                        label={
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Max Width
                          </Text>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          min={0.1}
                          max={10}
                          step={0.1}
                          precision={1}
                          placeholder='Max Width'
                        />
                      </CompactFormItem>
                    </div>
                  </div>
                </Space>
              </CompactFormItem>

              <CompactFormItem
                label={renderLabel(
                  'Line Length Range',
                  'Length range of particle trails based on speed. Lower values for slower particles, higher values for faster ones.'
                )}
              >
                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <CompactFormItem
                        name={['lineLength', 'min']}
                        label={
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Min Length
                          </Text>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          min={1}
                          max={500}
                          step={1}
                          precision={1}
                          placeholder='Min Length'
                        />
                      </CompactFormItem>
                    </div>
                    <div style={{ flex: 1 }}>
                      <CompactFormItem
                        name={['lineLength', 'max']}
                        label={
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Max Length
                          </Text>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          min={1}
                          max={500}
                          step={1}
                          precision={1}
                          placeholder='Max Length'
                        />
                      </CompactFormItem>
                    </div>
                  </div>
                </Space>
              </CompactFormItem>

              <CompactFormItem
                name="speedFactor"
                label={renderLabel(
                  'Speed Factor',
                  'Factor to adjust the speed of particles. Controls the movement speed of particles.'
                )}
              >
                <NumberInput min={0.1} max={100} step={0.1} precision={1} />
              </CompactFormItem>

              <CompactFormItem
                name="dropRate"
                label={renderLabel(
                  'Drop Rate',
                  'Rate at which particles are dropped (reset). Controls the lifecycle of particles.'
                )}
              >
                <NumberInput min={0.001} max={0.01} step={0.001} precision={3} />
              </CompactFormItem>

              <CompactFormItem
                name="dropRateBump"
                label={renderLabel(
                  'Drop Rate Bump',
                  'Additional drop rate for slow-moving particles. Increases the probability of dropping particles when they move slowly.'
                )}
              >
                <NumberInput min={0} max={0.2} step={0.001} precision={3} />
              </CompactFormItem>

              <CompactFormItem
                name="colors"
                label={renderLabel(
                  'Color Scheme',
                  'Array of colors for particles. Can be used to create color gradients.'
                )}
              >
                <ColorTableInput 
                  value={options.colors}
                  onChange={(colors) => {
                    handleValuesChange({ colors }, { ...options, colors });
                  }}
                />
              </CompactFormItem>

              <CompactFormItem
                name="flipY"
                label={renderLabel(
                  'Flip Y Axis',
                  'Whether to flip the Y-axis of the wind data.'
                )}
                valuePropName="checked"
              >
                <Switch
                  size="small"
                  checkedChildren="Flipped"
                  unCheckedChildren="Normal"
                />
              </CompactFormItem>

              <CompactFormItem
                name="useViewerBounds"
                label={renderLabel(
                  'Use Viewer Bounds',
                  'Generate particles within the current view bounds instead of the entire wind field.'
                )}
                valuePropName="checked"
              >
                <Switch
                  size="small"
                  checkedChildren="View Bounds"
                  unCheckedChildren="Global"
                />
              </CompactFormItem>

              <CompactFormItem
                name="dynamic"
                label={renderLabel(
                  'Dynamic Animation',
                  'Enable or disable particle animation. When disabled, particles will remain static.'
                )}
                valuePropName="checked"
              >
                <Switch
                  size="small"
                  checkedChildren="Animated"
                  unCheckedChildren="Static"
                />
              </CompactFormItem>

              <CompactFormItem
                label={renderLabel(
                  'Speed Range',
                  'Controls the speed range for rendering and display.'
                )}
              >
                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                      Rendering Range
                    </Text>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <CompactFormItem
                          name={['domain', 'min']}
                          label={
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              Min
                            </Text>
                          }
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            min={0}
                            max={50}
                            step={0.1}
                            style={{ width: '100px' }}
                            placeholder="Min"
                            precision={1}
                          />
                        </CompactFormItem>
                      </div>
                      <div style={{ flex: 1 }}>
                        <CompactFormItem
                          name={['domain', 'max']}
                          label={
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              Max
                            </Text>
                          }
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            min={0}
                            max={50}
                            step={0.1}
                            style={{ width: '100px' }}
                            placeholder="Max"
                            precision={1}
                          />
                        </CompactFormItem>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                      Display Range
                    </Text>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <CompactFormItem
                          name={['displayRange', 'min']}
                          label={
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              Min
                            </Text>
                          }
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            min={0}
                            max={50}
                            step={0.1}
                            style={{ width: '100px' }}
                            placeholder="Min"
                            precision={1}
                          />
                        </CompactFormItem>
                      </div>
                      <div style={{ flex: 1 }}>
                        <CompactFormItem
                          name={['displayRange', 'max']}
                          label={
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              Max
                            </Text>
                          }
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            min={0}
                            max={50}
                            step={0.1}
                            style={{ width: '100px' }}
                            placeholder="Max"
                            precision={1}
                          />
                        </CompactFormItem>
                      </div>
                    </div>
                  </div>
                </Space>
              </CompactFormItem>
            </Space>
          </Form>
        </CardContent>
      </StyledCard>
    </ControlPanelContainer>
  );
};
