import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import SpinnerMiniDashboard from "../../ui/SpinnerMiniDashboard";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays?.length;

  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      {!numBookings ? (
        <SpinnerMiniDashboard />
      ) : (
        <Stat
          title="Bookings"
          value={numBookings}
          color="blue"
          icon={<HiOutlineBriefcase />}
        />
      )}
      {!sales ? (
        <SpinnerMiniDashboard />
      ) : (
        <Stat
          title="Sales"
          value={formatCurrency(sales)}
          color="green"
          icon={<HiOutlineBanknotes />}
        />
      )}
      {!checkins ? (
        <SpinnerMiniDashboard />
      ) : (
        <Stat
          title="Check Ins"
          value={checkins}
          color="indigo"
          icon={<HiOutlineCalendarDays />}
        />
      )}
      {!occupation ? (
        <SpinnerMiniDashboard />
      ) : (
        <Stat
          title="Occupancy Rate"
          value={Math.round(occupation * 100) + "%"}
          color="yellow"
          icon={<HiOutlineChartBar />}
        />
      )}
    </>
  );
}

export default Stats;
