import React from "react";
import { Loading, LoadingProps } from "./Loading";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Temp/Loading",
  component: Loading
} as Meta;

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {};
