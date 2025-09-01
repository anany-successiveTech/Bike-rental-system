import { Card, CardContent } from "@/components/ui/card";

const CityCard = ({ image, name }) => {
  return (
    <Card className="w-50 overflow-hidden h-40">
      <img src={image} alt={name} className="w-full h-28 object-cover" />
      <CardContent className="p-2 text-center">
        <p className="text-sm font-medium">{name}</p>
      </CardContent>
    </Card>
  );
};

export default CityCard;
