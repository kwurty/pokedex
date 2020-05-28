<template>
  <div class="container">

  </div>
</template>

<script>
export default {
    props: [
      {
        id: Number,
        name: String,
        base_experience: Number,
        height: Number,
        is_default: Boolean,
        order: Number,
        weight: Number,
        abilities: Array,
        forms: Array,
        game_indeces: Array,
        held_items: Array,
        location_area_encounters: String,
        moves: Array,
        sprites: Object,
        species: Object,
        stats: Array,
        types: Array
      }
    ]
}
</script>

<style>

</style>