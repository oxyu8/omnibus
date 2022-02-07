import { Input } from "@nextui-org/react";
import { Search } from "react-iconly";

type Props = {
  query: string;
  onChangeQuery: (e: any) => void;
  onClickBtn: (e: any) => void;
};

export const SearchBar: React.FC<Props> = ({
  query,
  onChangeQuery,
  onClickBtn,
}) => {
  return (
    <>
      <Input
        onKeyPress={onClickBtn}
        clearable
        contentRightStyling={false}
        value={query}
        onChange={onChangeQuery}
        style={{ width: 500 }}
        contentRight={
          <div onClick={onClickBtn}>
            <Search
              set="broken"
              size={"medium"}
              style={{
                marginRight: 15,
                marginTop: 5,
                marginLeft: 10,
                cursor: "pointer",
              }}
            />
          </div>
        }
      />
    </>
  );
};
