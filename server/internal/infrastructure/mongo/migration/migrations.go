// Code generated by migrategen, DO NOT EDIT.

package migration

// To add a new migration, run go run ./tools/cmd/migrategen migration_name

// WARNING:
// If the migration takes too long, the deployment may fail in a serverless environment.
// Set the batch size to as large a value as possible without using up the RAM of the deployment destination.
var migrations = map[int64]MigrationFunc{
  201217132559: AddSceneWidgetId,
  201217193948: AddSceneDefaultTile,
  210310145844: RemovePreviewToken,
  210730175108: AddSceneAlignSystem,
  220214180713: SplitSchemaOfProperties,
  220309174648: AddSceneFieldToPropertySchema,
  221028204300: MoveTerrainProperties,
}
