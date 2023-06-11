import {
  Container,
  Heading,
  TitleSection,
  Label,
  DeviceIdentifier,
  AcademyIdentifier
} from './batteryReport.style';
import { Academy } from '../../types';
import { List } from '../../components/list';

interface BatteryReportProps {
  academies: (string | Academy[])[]
}

export const BatteryReport = (props: BatteryReportProps) => {
  const { academies } = props;

  const renderFaultyDevices = (academy: Academy[]) => {
    if (Array.isArray(academy[1])) {
      return (
        <>
          <Label>Faulty devices:</Label>
            <div>
              <List>
                {
                  academy[1].map((device: Academy) => {
                    return(
                      <List.Item key={device.serialNumber}>
                        <DeviceIdentifier>{device.serialNumber}</DeviceIdentifier>
                      </List.Item>
                    )
                  })
                }
              </List>
            </div>
        </>
      )
    }
  }
  
  const renderListSection = () => {
    return (
      <List>
        {
          academies.map((academy: string | Academy[]) => {
            return (
              <List.Item key={academy[0] as string}>
                <div>
                  <Label>Academy Id:</Label>
                  <AcademyIdentifier>{academy[0] as string}</AcademyIdentifier>
                </div>
                { renderFaultyDevices(academy as Academy[]) }
              </List.Item>
            )
          })
        }
    </List>
    )
  }

  const renderHeaderSection = () => {
    return (
      <TitleSection>
        <Heading>Batteries report</Heading>
      </TitleSection>
    )
  }
  
  return (
    <Container>
      {renderHeaderSection()}
      {renderListSection()}
    </Container>
  );
}
