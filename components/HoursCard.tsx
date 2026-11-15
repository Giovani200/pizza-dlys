import { Fragment } from "react";
import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Card, type CardTilt } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { fillTemplate, formatTime } from "@/lib/format";
import { formatDayList, groupOpeningDays } from "@/lib/opening-hours";
import styles from "./HoursCard.module.css";

type HoursCardProps = { headingLevel: "h2" | "h3"; tilt?: CardTilt };

export function HoursCard({ headingLevel: Heading, tilt }: HoursCardProps) {
  return (
    <Card tone="paper" tilt={tilt}>
      <Heading className={`${styles.title} display-type text-h4`}>{ui.home.find_us.hours}</Heading>
      <StatusBadge variant="inline" className={styles.status} />
      {groupOpeningDays().map(({ days, slots }) => (
        <div key={days.join()} className={`${styles.row} separator`}>
          <span>{formatDayList(days)}</span>
          <span className={`${styles.slots} bold`}>
            {slots.length === 0
              ? ui.status.closed
              : slots.map(([start, end], index) => (
                  <Fragment key={start}>
                    {index > 0 && <br />}
                    {fillTemplate(ui.home.find_us.slot, { start: formatTime(start), end: formatTime(end) })}
                  </Fragment>
                ))}
          </span>
        </div>
      ))}
      <p className={`${styles.note} text-small separator`}>{infos.hours.phone_order_note}</p>
    </Card>
  );
}
