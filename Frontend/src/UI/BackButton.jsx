import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      icon={<LeftOutlined />}
      size="medium"
      className="absolute top-5 left-5 z-10 bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light border-0 shadow-lg hover:scale-105 transition-transform md:top-8 md:left-8"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    />
  );
};

export default BackButton;
