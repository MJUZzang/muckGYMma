export interface MealInfo {
    id: number;
    name: string;
    kcal: number;
    carbo: number;
    protein: number;
    fat: number;
    sodium: number;
    gram: number;
    imageUrl: string;
    exercised: boolean;
    posted: boolean;
    planed: boolean;
    createdAt: Date;
}
