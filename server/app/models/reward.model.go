package models

import (
	"time"

	"gorm.io/datatypes"
)

type RewardRank string

const (
	G8  RewardRank = "g8"
	G7  RewardRank = "g7"
	G6  RewardRank = "g6"
	G5  RewardRank = "g5"
	G4  RewardRank = "g4"
	G3  RewardRank = "g3"
	G2  RewardRank = "g2"
	G1  RewardRank = "g1"
	GDB RewardRank = "gDB"
)

type RewardValue struct {
	Rank     RewardRank `json:"reward_rank" gorm:"type:varchar(3);not null;check:reward_rank IN ('g8', 'g7', 'g6', 'g5', 'g4', 'g3', 'g2', 'g1', 'gDB')"`
	Region   Region     `json:"region" gorm:"type:char(2);check:region IN ('mb', 'mt', 'mn')"`
	Province Province   `json:"province" gorm:"type:varchar(5);check:province IN ('tp', 'dt', 'cm', 'bt', 'dn', 'ct', 'st', 'vt', 'bli', 'tn', 'bth', 'vl', 'bd', 'tv', 'la', 'hg', 'bp', 'tg', 'kg', 'dl', 'py', 'th', 'qna', 'kh', 'qb', 'qt', 'gl', 'nt', 'qn', 'dno', 'kt', 'mb', 'ag')"`
	Values   []string   `json:"value" gorm:"type:varchar(6)"`
}

type Reward struct {
	ID           string                           `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	At           string                           `json:"at" gorm:"type:varchar(255);not null;uniqueIndex"`
	RewardValues datatypes.JSONSlice[RewardValue] `json:"reward_values" gorm:"type:jsonb"`

	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default:CURRENT_TIMESTAMP"`
}
