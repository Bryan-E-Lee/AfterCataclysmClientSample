import { RecordStatus } from "../RecordStatus";
import { Comparator, isComparator } from "../Utilities";
import { Enemy } from "../library/enemies/Enemy";
import { ObjectFilter, ObjectFilterInitializer } from "./ObjectFilter";

export interface EnemyFilterInitializer extends ObjectFilterInitializer {
    level: number;
    levelComparator: Comparator | null;
}

export class EnemyFilter extends ObjectFilter<ObjectFilterInitializer> {
    public constructor(initializer: EnemyFilterInitializer) {
        super(initializer);
        this.level = initializer.level;
        this.levelComparator = initializer.levelComparator;
    }

    public level: number;
    public levelComparator: Comparator | null;

    private static readonly DefaultLevel: number = 1;
    private static readonly DefaultLevelComparator: Comparator | null = null;

    public static GetDefaultInitializer(): EnemyFilterInitializer {
        return {
            ...ObjectFilter.GetDefaultInitializer(),
            level: this.DefaultLevel,
            levelComparator: this.DefaultLevelComparator,
        }
    }

    public getInitializer(): EnemyFilterInitializer {
        return {
            ...super.getInitializer(),
            level: this.level,
            levelComparator: this.levelComparator
        }
    }

    public static CreateFilterFromQuery(query: URLSearchParams): EnemyFilter {
        const name = query.get("name") ?? "";
        const level = parseInt(query.get("level") ?? this.DefaultLevel.toString());
        const testLevelComparator = query.get("levelComparator") ?? "";
        const levelComparator: Comparator | null = isComparator(testLevelComparator)
            ? testLevelComparator
            : null;
        
        return new EnemyFilter({
            name,
            level,
            levelComparator,
        })
    }

    public filter(enemies: Enemy[]): Enemy[] {
        let filteredEnemies = super.filterBase(enemies);
        filteredEnemies = filteredEnemies.filter(enemy => enemy.recordStatus == RecordStatus.Published);
        filteredEnemies = filteredEnemies.filter(this.filterEnemyLevel);
        return filteredEnemies;
    }

    private filterEnemyLevel = (enemy: Enemy) => {
        switch (this.levelComparator) {
            case ">":
                return enemy.level > this.level;
            case "<":
                return enemy.level < this.level;
            case ">=":
                return enemy.level >= this.level;
            case "<=":
                return enemy.level <= this.level;
            case "==":
                return enemy.level == this.level;
            case "!=":
                return enemy.level != this.level;
            default:
                return true;
        }
    }
}