import SectionHeading from "@/components/SectionHeading";
import SkillMarquee from "@/components/SkillMarquee";
import { skills } from "@/data/skills";

export default function Skills() {
  const half = Math.ceil(skills.length / 2);
  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionHeading index="02" kicker="Skills" title="Toolbox.">
          Web, mobile, IoT and teaching. Drag or swipe the rows to look around.
        </SectionHeading>
      </div>
      <div className="space-y-4">
        <SkillMarquee from={0} to={half} speed={38} label="Skills, row one" />
        <SkillMarquee from={half} speed={26} label="Skills, row two" />
      </div>
    </section>
  );
}
