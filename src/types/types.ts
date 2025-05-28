export type Field =
  | {
      type: "text";
      name: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "coordinate";
      nameLat: string;
      nameLng: string;
      label: string;
    }
  | {
      type: "checkbox";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "select";
      name: string;
      label: string;
      placeholder?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "multiselect";
      name: string;
      label: string;
      placeholder?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "time";
      name: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "image";
      name: string;
      label: string;
    }
