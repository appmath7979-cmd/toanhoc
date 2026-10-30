package request

import "server/app/models"

type CreateReward struct {
	// Region       models.Region                           `json:"region" binding:"required,oneof=mb mt mn"`
	// Province     models.Province                         `json:"province" binding:"required,oneof=tp dt cm bt dn ct st vt bli tn bth vl bd tv la hg bp tg kg dl py th qna kh qb qt gl nt qn dno kt mb ag"`
	At           string               `json:"at" binding:"required"`
	RewardValues []models.RewardValue `json:"reward_values" binding:"required"`
}
