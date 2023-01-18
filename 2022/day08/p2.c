#include <time.h>
#include <stdio.h>
#include <string.h>
int main()
{
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    int trees[99][99];
    int i = 0;

    while(fgets(line, sizeof(line), file)) {
        for(int j = 0; j < strlen(line); j++) {
            trees[i][j] = line[j] - '0';
        }
        i++;
    }

    int treesLength = sizeof(trees[0]) / sizeof(trees[0][0]);
    int maxScenicScore = 0;

    for(int i = 1; i < treesLength - 1; i++) {
        for(int j = 1; j < treesLength - 1; j++) {
            int current = trees[i][j];
            int top = 0, down = 0, left = 0, right = 0;
            // top
            for(int k = i - 1; k >= 0; k--) {
                top++;
                if(trees[k][j] >= current) {
                    break;
                }
            }
            // down
            for(int k = i + 1; k < treesLength; k++) {
                down++;
                if(trees[k][j] >= current) {
                    break;
                }
            }
            // left
            for(int k = j - 1; k >= 0; k--) {
                left++;
                if(trees[i][k] >= current) {
                    break;
                }
            }
            // right
            for(int k = j + 1; k < treesLength; k++) {
                right++;
                if(trees[i][k] >= current) {
                    break;
                }
            }
            int p = top * down * left * right;
            maxScenicScore = maxScenicScore > p ? maxScenicScore : p;
        }
    }

    printf("%d", maxScenicScore);

    fclose(file);

    return 0;
}