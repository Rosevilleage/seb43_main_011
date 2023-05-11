package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomPatchDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomRecipeService {

    private final CustomRecipeRepository customRecipeRepository;


    public CustomRecipeResponseDto saveCustomRecipe(CustomRecipePostDto customRecipePostDto) {
        CustomRecipe customRecipe = CustomRecipe.of(customRecipePostDto);
        customRecipeRepository.save(customRecipe);

        return CustomRecipeResponseDto.of(customRecipe);
    }


    public CustomRecipeResponseDtoList findCustomRecipeList() {
        List<CustomRecipe> customRecipeList = customRecipeRepository.findByDeletedFalse();
        return CustomRecipeResponseDtoList.of(customRecipeList);
    }


    public CustomRecipeResponseDto updateCustomRecipe(Long id, CustomPatchDto customPatchDto) {

        CustomRecipe updateCustomRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);


        if (customPatchDto.getImageUrl() != null) {
            updateCustomRecipe.setImageUrl(customPatchDto.getImageUrl());
        }
        if (customPatchDto.getName() != null) {
            updateCustomRecipe.setName(customPatchDto.getName());
        }
        if (customPatchDto.getDescription() != null) {
            updateCustomRecipe.setDescription(customPatchDto.getDescription());
        }
        if (customPatchDto.getRecipe() != null) {
            updateCustomRecipe.setRecipe(customPatchDto.getRecipe());
        }
        if (customPatchDto.getIngredient() != null) {
            updateCustomRecipe.setIngredient(customPatchDto.getIngredient());
        }

        updateCustomRecipe.setModifiedAt(LocalDateTime.now());

        customRecipeRepository.save(updateCustomRecipe);

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }


    public void deleteCustomRecipe(Long id) {
        CustomRecipe existingRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        existingRecipe.setDeleted(true);
        customRecipeRepository.save(existingRecipe);
    }

}
