import { FarmCycleResponseType } from "../../../assets/types/farm/cycle/response";
import { farmStateAtomType } from "../../../atoms/farmState";
import { farmLoad } from "../load";
import { farmLoadCycle } from "../loadCycle";

interface FarmLoadAllProps {
  farmId: number;
  year: number;
  month: number;
}

export const farmLoadAll = async ({
  farmId,
  year,
  month,
}: FarmLoadAllProps): Promise<farmStateAtomType> => {
  const data: farmStateAtomType = (await farmLoad({
    farmId: farmId,
  })) as farmStateAtomType;

  const cycles: FarmCycleResponseType = (await farmLoadCycle({
    farmId: farmId,
    year: year,
    month: month,
  })) as FarmCycleResponseType;

  return Object.assign(data, cycles, { year: year, month: month });
};
