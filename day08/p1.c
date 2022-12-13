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
    int visible = 4 * (treesLength - 2) + 4;

    for(int i = 1; i < treesLength - 1; i++) {
        for(int j = 1; j < treesLength - 1; j++) {
            int current = trees[i][j];
            int top = 1, down = 1, left = 1, right = 1;
            // top
            for(int k = i - 1; k >= 0; k--) {
                if(trees[k][j] >= current) {
                    top = 0;
                }
            }
            // down
            for(int k = i + 1; k < treesLength; k++) {
                if(trees[k][j] >= current) {
                    down = 0;
                }
            }
            // left
            for(int k = j - 1; k >= 0; k--) {
                if(trees[i][k] >= current) {
                    left = 0;
                }
            }
            // right
            for(int k = j + 1; k < treesLength; k++) {
                if(trees[i][k] >= current) {
                    right = 0;
                }
            }
            if(top || down || left || right) {
                visible++;
            }
        }
    }

    printf("%d", visible);

    fclose(file);

    return 0;
}