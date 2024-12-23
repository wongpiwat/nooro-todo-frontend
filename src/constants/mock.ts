export interface Task {
  id: string;
  title: string;
  color: string;
  status: boolean;
  timestamps: Date;
}

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    color: "red",
    status: false,
    timestamps: new Date(),
  },
  {
    id: "2",
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    color: "blue",
    status: false,
    timestamps: new Date(),
  },
  {
    id: "3",
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    color: "green",
    status: false,
    timestamps: new Date(),
  },
  {
    id: "4",
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    color: "yellow",
    status: true,
    timestamps: new Date(),
  },
  {
    id: "5",
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    color: "orange",
    status: true,
    timestamps: new Date(),
  },
];
