import React from "react";
import { Eyecatchers, EyecatchersProps } from "./Eyecatchers";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Temp/Eyecatchers",
  component: Eyecatchers
} as Meta;

const Template: Story<EyecatchersProps> = (args) => <Eyecatchers {...args} />;

export const Default = Template.bind({});
Default.args = {};
