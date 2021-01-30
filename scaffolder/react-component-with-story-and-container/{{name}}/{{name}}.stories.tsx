import React from "react";
import { {{name}}, {{name}}Props } from "./{{name}}";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "{{StorySection}}/{{name}}",
  component: {{name}}
} as Meta;

const Template: Story<{{name}}Props> = (args) => <{{name}} {...args} />;

export const {{StoryName}} = Template.bind({});
{{StoryName}}.args = {};
