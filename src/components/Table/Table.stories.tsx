import React from "react";
import { Table, TableProps } from "./Table";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Temp/Table",
  component: Table
} as Meta;

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {};
