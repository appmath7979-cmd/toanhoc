import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Heading from "@/components/ui/typography/Heading";
import { withFieldGroup } from "@/context/form.context";
import { defaultSettingInfo } from "@/data/customer-form.data";
import { Region } from "@/types/region.type";
import { useState } from "react";

const regions: {
  value: Region;
  id: string;
  label: string;
}[] = [
    { id: "tab-trigger-mb", label: "Miền Bắc", value: "mb" },
    { id: "tab-trigger-mt", label: "Miền Trung", value: "mt" },
    { id: "tab-trigger-mn", label: "Miền Nam", value: "mn" },
  ];

const SettingInfo = withFieldGroup({
  defaultValues: { setting: { ...defaultSettingInfo } },
  render: ({ group }) => {
    const [currentRegion, setCurrentRegion] = useState<Region>("mt");

    return (
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cấu hình</CardTitle>
          <CardBody>
            <group.AppField name="setting.xien_mb">
              {(field) => (
                <field.RadioField
                  variant="box"
                  defaultValue="false"
                  values={[
                    {
                      id: "radio-xien_mb--true",
                      label: "Cho phép",
                      value: "true",
                      description: "Cho phép đánh xiên Miền Bắc.",
                    },
                    {
                      id: "radio-xien_mb--false",
                      label: "Không",
                      value: "false",
                      description: "Không cho phép đánh xiên Miền Bắc.",
                    },
                  ]}
                />
              )}
            </group.AppField>
            <Tabs
              defaultValue={"mb"}
              value={currentRegion}
              onValueChange={(value) => setCurrentRegion(value as Region)}
            >
              <TabsList>
                {regions.map((item) => (
                  <TabsTrigger key={item.id} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {
                regions.map(r => <TabsContent key={`${r.id}-content`} value={r.value} >
                  <group.Field name="setting.bets">
                    {(field) =>
                      field.state.value.map((item, i) => {
                        return (
                          <Box key={`${item.bet_type}-${r}`}>
                            <Flex>
                              <Heading as="h4">{item.bet_type}</Heading>
                              switch  
                            </Flex>
                            <group.AppField
                              name={`setting.bets[${i}].c.${r.value}`}
                            >
                              {(subfield) => <subfield.TextField type="number" />}
                            </group.AppField>
                            <group.AppField
                              name={`setting.bets[${i}].t.${r.value}`}
                            >
                              {(subfield) => <subfield.TextField type="number" />}
                            </group.AppField>
                          </Box>
                        );
                      })
                    }
                  </group.Field>
                </TabsContent>)
              }
            </Tabs>
            <group.AppField name="setting.dax_t">
              {(field) => (
                <field.RadioField
                  defaultValue="HALF"
                  values={[
                    {
                      id: "radio-dax_t--ONE",
                      label: "Một ky",
                      value: "ONE",
                    },
                    {
                      id: "radio-dax_t--HALF",
                      label: "Ky rưỡi",
                      value: "HALF",
                    },
                    {
                      id: "radio-dax_t--MANY",
                      label: "Nhiều ky",
                      value: "MANY",
                    },
                  ]}
                />
              )}
            </group.AppField>
          </CardBody>
        </CardHeader>
      </Card>
    );
  },
});

export default SettingInfo;
