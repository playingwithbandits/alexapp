import React from "react";
import { Trainers, TrainersProps } from "./Trainers";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Trainers/Trainers",
  component: Trainers
} as Meta;

const Template: Story<TrainersProps> = (args) => <Trainers {...args} />;

export const Default = Template.bind({});
Default.args = {};
