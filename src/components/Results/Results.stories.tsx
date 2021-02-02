import React from "react";
import { Results, ResultsProps } from "./Results";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Results/Results",
  component: Results
} as Meta;

const Template: Story<ResultsProps> = (args) => <Results {...args} />;

export const Default = Template.bind({});
Default.args = {};
